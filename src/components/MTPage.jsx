import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button, Thumbnail } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'
import { Layer, Stage, Image as KImage, Rect } from 'react-konva'
import { DropZone } from './DropZone.jsx'
import Slider from "react-slick";
import { MtItem } from './MeterViewer.jsx'
import { UrlUpload } from './UrlUpload.jsx'
import { MetersSlider } from './Slider.jsx'


@inject("mtStore")
@observer
export default class MTPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      unsupportedFile: null,
      imageKey: 0,
      inputSource: null,
      showId: null
    }

    this.handlerId = this.handlerId.bind(this)
  }

  handlerId (id) {
    console.log("SET SHOW ID", id)
    this.setState({showId: id})
  }

  handleInput () {
    this.setState({inputSource: 'gallery'})
  }

  inputZone () {
    switch(this.state.inputSource) {
        case 'gallery':
            return <MetersSlider handlerId={this.handlerId}/>
        case 'file':
            return <DropZone handlerId={this.handlerId}/>
        case 'url':
            return <UrlUpload handlerId={this.handlerId}/>
        default:
            return null
    }
  }

  showResult () {
    return <MtItem id={this.state.showId}
                   key={this.state.showId}
                   width={600}
                   height={300} />
  }
  
  render () {
    return (
      <div className='page'>            
        <Grid fluid>
          <Row>
            <span className='headline centered-text'> Распознавание показаний счетчиков </span>
          </Row>
          <Row>
            <div className="container centered-text">
              <ul>
                <li className="one"><a href="#" onClick={() => {this.setState({inputSource: 'gallery'})}}>Галерея счетчиков</a></li>
                <li className="two"><a href="#" onClick={() => {this.setState({inputSource: 'file'})}}>Выбрать из файла</a></li>
                <li className="three"><a href="#" onClick={() => {this.setState({inputSource: 'url'})}}>Загрузить по ссылке</a></li>
                <hr />
              </ul>
            </div>
          </Row>
          <Row>
            {(this.state.inputSource !== null) 
             ? this.inputZone()
             : null
            }
          </Row>
          <Row>
            { this.showResult() }
          </Row>
        </Grid>
      </div>
    )
  }
}
