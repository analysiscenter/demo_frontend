import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { ReactBootstrapSlider } from 'react-bootstrap-slider'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'
import { Layer, Stage, Image, Rect } from 'react-konva'


@inject("ct_store")
@observer
export default class CTItemPage extends Component {
    constructor(props) {
        super(props)
        props.ct_store.getItemData(props.match.params.id)
        this.state = {currentSlice: 0}
    }

    onSliceChange(event) {
        this.setState({currentSlice: event.target.value})
    }

    renderImageViewer(item) {
        const imageData = this.props.ct_store.getImageSlice(item.id, this.state.currentSlice)

        const resize = 5
        const canvas = document.createElement('canvas')
        canvas.width = item.image[0][0].length
        canvas.height = item.image[0].length
        const ctx = canvas.getContext('2d')
        ctx.putImageData(imageData, 0, 0)

        const canvas2 = document.createElement('canvas')
        canvas2.width = canvas.width * resize
        canvas2.height = canvas.height * resize
        const ctx2 = canvas2.getContext('2d');
        ctx2.drawImage(canvas, 0, 0, canvas2.width, canvas2.height)

        const div_style = { width: canvas2.width + 40 }
        const slider_style = { height: canvas2.height }

        return (
            <div className="image-viewer" style={div_style}>
            <Stage width={canvas2.width} height={canvas2.height} style={{float:"left"}}>
                <Layer>
                    <Image image={canvas2} />
                </Layer>
            </Stage>
            <div style={slider_style}>
                <ReactBootstrapSlider value={this.state.currentSlice} change={this.onSliceChange.bind(this)} min={0} max={31} orientation="vertical" />
            </div>
            </div>
        )
    }

    renderImageLoading() {
        return (
            <Icon name="spinner" spin className="loading" />
        )
    }

    renderPage(item) {
        return (
            <Row>
            <Col sm={11} lg={8} >
                { (item.image) ?
                  this.renderImageViewer(item)
                  :
                  this.renderImageLoading()
                }
            </Col>
            </Row>
        )
    }

    renderPageLoading() {
        return (
            <Row>
            <Col xs={12}>
                <Icon name="spinner" spin className="page loading" />
            </Col>
            </Row>
        )
    }

    render() {
        const self = this
        const item = this.props.ct_store.items.get(this.props.match.params.id)

        return (
        <div className="page ct item">
            <Grid fluid>
            <Row>
                <Col xs={12}>
                    <h2>Patient {this.props.match.params.id}</h2>
                </Col>
            </Row>
            {(item === undefined) ?
             this.renderPageLoading()
             :
             this.renderPage(item)
            }
            </Grid>
        </div>
        )
    }
}
