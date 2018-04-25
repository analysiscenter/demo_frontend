import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'
import { Image } from 'react-bootstrap'


@inject("mtStore")
@observer
export class MtItem extends React.Component {
  renderInference (item) {
    const hRatio = this.props.width / item.image.width
    const vRatio = this.props.height / item.image.height
    const ratio = Math.min(hRatio, vRatio)
    const centerShift_x = (this.props.width - item.image.width * ratio) / 2
    const centerShift_y = (this.props.height - item.image.height * ratio) / 2
    let box = item.inference.bbox.map(x => x * ratio)

    const canvas = document.createElement('canvas')
    canvas.width = this.props.width
    canvas.height = this.props.height
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(item.image, centerShift_x, centerShift_y,
                  item.image.width * ratio, item.image.height * ratio)
    ctx.beginPath()
    ctx.lineWidth="7"
    ctx.strokeStyle="green"
    ctx.rect(centerShift_x + box[0], centerShift_y + box[1], box[2], box[3])
    ctx.stroke()
    
    return (
      <div>
        <Image src={canvas.toDataURL()} />
        <br />
        <span className="predict">На счетчике: {item.inference.value}</span>
      </div>
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
      <div className='image-viewer'>
        { item.inference ? this.renderInference(item) : null }
      </div>
    )
  }
}