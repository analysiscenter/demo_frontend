import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'
import { Layer, Stage, Image, Ellipse } from 'react-konva'
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
    
    drawImage(image) {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.putImageData(image, 0, 0)
        return canvas
    }

    drawBox(box, width, height) {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
               
        ctx.rect(box[0], box[1], box[2], box[3])
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'green';
        ctx.stroke();
        
        return canvas
    }

    renderImageViewer(item) {
        const self = this

        const imageData = this.props.mt_store.getImage(item.id)
        const drawn_image = this.drawImage(imageData)
        // const drawn_box = this.drawBox(box, imageData.width, imageData.height)

        let drawn_box = null
        if (item.inference != null)
        {
            drawn_box = this.drawBox(item.inference.bbox, imageData.width, imageData.height)
        }

        return (
            <div className="image-viewer">
                <div className="image-viewer-with-toggles">
                    <Stage width={drawn_image.width} height={drawn_image.height}>
                        <Layer><Image image={drawn_image} /></Layer>
                        { ((drawn_box != null)) ? <Layer><Image image={drawn_box} /></Layer> : null}
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
