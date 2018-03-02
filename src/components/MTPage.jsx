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
    handleInference(id) {
        this.props.mt_store.getInference(id)
    }

    drawImage(item, image, resizeFactor) {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.putImageData(image, 0, 0)

        const canvas2 = document.createElement('canvas')
        canvas2.width = canvas.width / resizeFactor
        canvas2.height = canvas.height / resizeFactor
        const ctx2 = canvas2.getContext('2d')
        ctx2.drawImage(canvas, 0, 0, image.width / resizeFactor, image.height / resizeFactor)
        return canvas2
    }

    renderImageViewer(item) {
        const self = this

        const imageData = this.props.mt_store.getImage(item.id)

        const resizeFactor = Math.max(imageData.width, imageData.height) / 300

        const image = this.drawImage(item, imageData, resizeFactor)

        let box = null
        if (item.inference != null)
            box = item.inference.bbox.map(x => x / resizeFactor)

        return (
            <div className="image-viewer">
                <div className="image-viewer-with-toggles">
                    <Stage width={image.width} height={image.height}>
                        <Layer><KImage image={image} /></Layer>
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
            <div className="item" id={item.id}>
                <div>
                    <div>
                    { item.image == null ?
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
