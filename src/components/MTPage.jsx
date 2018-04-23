import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'
import { Layer, Stage, Image as KImage, Rect } from 'react-konva'

@inject("mtStore")
@observer
export class MtItem extends React.Component {
  drawImage (img, ratio, centerShift_x, centerShift_y) {
    const canvas = document.createElement('canvas')
    canvas.width = this.props.width
    canvas.height = this.props.height
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, centerShift_x, centerShift_y,
      img.width * ratio, img.height * ratio)
    return canvas
  }

  renderImageViewer (item) {
    const hRatio = this.props.width / item.image.width
    const vRatio = this.props.height / item.image.height
    const ratio = Math.min(hRatio, vRatio)
    const centerShift_x = (this.props.width - item.image.width * ratio) / 2
    const centerShift_y = (this.props.height - item.image.height * ratio) / 2

    const image = this.drawImage(item.image, ratio, centerShift_x, centerShift_y)

    let box = null
    if (item.inference !== null) {
      box = item.inference.bbox.map(x => x * ratio)
    }

    return (
      <div className='image-viewer'>
        <Stage width={this.props.width} height={this.props.height}>
          <Layer><KImage image={image} /></Layer>
          { (item.inference !== null)
            ? <Layer>
              <Rect x={centerShift_x + box[0]}
                y={centerShift_y + box[1]}
                width={box[2]}
                height={box[3]}
                stroke='green' strokeWidth={7} />
            </Layer>
            : null}
        </Stage>
      </div>
    )
  }

  renderImageLoading () {
    return (
      <Icon name='spinner' spin className='loading' />
    )
  }

  render () {
    const item = this.props.mtStore.items.get(this.props.id)
    if (item === undefined) {
      return null
    }
    if (item.waitingData) {
      return null
    }
    return (
      <Col xs={12} sm={6} md={6} lg={4} key={item.id}>
        <div id={item.id}>
          <div>
            <div>
              { item.image === null
                ? this.renderImageLoading(item)
                : <div>
                  {this.renderImageViewer(item)}
                </div>
              }
            </div>
            <br />
            { item.inference ? <span><span>Prediction: </span>{item.inference.value}</span>
              : null
            }
          </div>
        </div>
      </Col>
    )
  }
}

const item_template = {
  id: null,
  image: null,
  src: null,
  height: null,
  width: null,
  inference: null,
  waitingData: false,
  waitingInference: false
}

@inject("mtStore")
@observer
export default class MTPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      unsupportedFile: null,
      imageKey: 0
    }
  }

  uploadFile (event) {
    let file = event.target.files[0]

    if (!(/\.(png|jpeg|jpg)$/i).test(file.name)) {
      this.setState({unsupportedFile: file.name})
      return null
    } else {
      this.setState({unsupportedFile: null})
    }

    let that = this
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      that.props.mtStore.uploadImage(reader.result)
      var img = new Image()
      img.src = reader.result
      img.onload = function () {
        let item = {
          id: 'uploaded/image.png',
          image: img,
          src: reader.result,
          height: img.height,
          width: img.width,
          inference: null,
          waitingData: false,
          waitingInference: false
        }
        that.props.mtStore.items.set(item.id, Object.assign({}, item_template, item))
        that.setState({imageKey: (that.state.imageKey + 1) % 2})
      }
    }
  }

  render () {
    return (
      <div className='page mt'>
        <span>
          <input type='file'
            name='myFile'
            onChange={this.uploadFile.bind(this)} />
        </span>
        <Grid fluid>
          <Row>
            <MtItem id='uploaded/image.png' key={this.state.imageKey}
              width={600} height={300} />
          </Row>
        </Grid>
      </div>
    )
  }
}
