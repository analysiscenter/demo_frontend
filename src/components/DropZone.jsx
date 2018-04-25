import React from 'react'
import { inject, observer } from 'mobx-react'
import { Icon } from 'react-fa'
import Dropzone from 'react-dropzone'


@inject("mtStore")
@observer
export class DropZone extends React.Component {
  onDrop(acceptedFiles, rejectedFiles) {
    let that = this
    let reader = new FileReader()
    reader.readAsDataURL(acceptedFiles.pop())
    reader.onload = function (e) {
      that.props.mtStore.uploadImage(reader.result)
      var img = new Image()
      img.src = reader.result
      img.onload = function () {
        let item = {
          id: 'uploaded/image.png',
          image: img,
          inference: null,
          waitingData: false,
          waitingInference: false
        }
        that.props.mtStore.setImage(item)
        that.props.handlerId(item.id)
      }
    }
  }

  render() {
    return (
        <Dropzone className="dropzone"
                  activeClassName="dropzone active"
                  rejectClassName="dropzone reject"
                  accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)}>
          <div className="drop-text"> Для загрузки, перетащите файл сюда </div>
        </Dropzone>
    )
  }
}
