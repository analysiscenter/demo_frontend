import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'
import { Layer, Stage, Image as KImage, Rect } from 'react-konva'
import Toggle from 'react-bootstrap-toggle'


@inject("mt_store")
@observer
export class MtItem extends Component {
    constructor(props) {
        super(props)
    }

    handleInference(id) {
        this.props.mt_store.getInference(id)
    }

    drawImage(item, image) {
        const canvas = document.createElement('canvas')
        canvas.width = item.width
        canvas.height = item.height
        const ctx = canvas.getContext('2d')

        let img = new Image(item.width, item.height)
        img.onload = function(){
            console.log('onload', item.id)
            ctx.drawImage(img, 0, 0)
        }
        img.src = image
        console.log('draw', item.id)
        return canvas
    }

    renderImageViewer(item) {
        const self = this

        const imageData = this.props.mt_store.getImage(item.id)
        const drawn_image = this.drawImage(item, imageData)

        let box = null
        if (item.inference != null)
            box = item.inference.bbox

        return (
            <div className="image-viewer">
                <div className="image-viewer-with-toggles">
                    <Stage width={item.width} height={item.height}>
                        <Layer><KImage image={drawn_image} /></Layer>
                        { (item.inference != null) ? <Layer><Rect x={box[0]} y={box[1]} width={box[2]} height={box[3]} stroke='green' strokeWidth={7} /></Layer> : null}
                    </Stage>
                </div>
            </div>
        )
    }

    renderImageLoading(item) {
        this.props.mt_store.getItemData(item.id)
        return (
            <Icon name="spinner" spin className="loading" />
        )
    }

   render() {
       const item = this.props.mt_store.items.get(this.props.id)
        return (
        <Col xs={12} sm={6} md={6} lg={4} key={item.id}>
            <div className="item">
                <div>
                    <div>
                    { item.img == null ?
                        this.renderImageLoading(item)
                        :
                        this.renderImageViewer(item)
                    }
                    </div>
                    <br/>
                    { item.inference ? <span><span>Prediction: </span>{item.inference.value}</span> :
                        <Button bsStyle="success" className="get-inference_small" onClick={this.handleInference.bind(this, item.id)}>
                        { item.waitingInference ?
                            <Icon name="spinner" spin />
                        :
                        <span><Icon name="check-circle-o"/><span>Predict</span></span>
                        }

                        </Button>
                    }
                </div>
            </div>
        </Col>
        )
    }
}

@inject("mt_store")
export default class MTPage extends Component {
    render() {
        return (
        <div className="page mt">
            <Grid fluid>
            <Row>
                { this.props.mt_store.items.values().map(item => <MtItem id={item.id} key={item.id}/>) }
            </Row>
            </Grid>
        </div>
        )
    }
}
    // { item.inference == null ?
    //                         <span></span>
    //                         :
    //                         <span>{item.inference.value}</span>
    //                     }
