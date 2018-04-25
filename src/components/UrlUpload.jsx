import React from 'react'
import { inject, observer } from 'mobx-react'

@inject("mtStore")
@observer
export class UrlUpload extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: null
    }
  }

  uploadUrlFile () {
    let that = this
	  var img = new Image()
	  img.src = this.state.query
	  img.onload = function () {
	    let item = {
	      id: 'uploaded/image.png',
	      image: img,
	      inference: null,
	      waitingData: false,
	      waitingInference: false
	    }
	    console.log('uploadUrlFile', img.src)
	    that.props.mtStore.setImage(item)
	    that.props.mtStore.uploadImage(img.src)
      that.props.handlerId(item.id)
	  }
  }

  render () {
    return (
      <div className="input-url">
      <input
        type='text'
        placeholder='Скопируйте ссылку сюда'
        onChange={event => { this.setState({query: event.target.value}) }}
        onKeyPress={event => {
          if (event.key === 'Enter') { this.uploadUrlFile() }
        }}
      />
      </div>
    )
  }
}

// uploadFile (event) {
//     let file = event.target.files[0]

//     if (!(/\.(png|jpeg|jpg)$/i).test(file.name)) {
//       this.setState({unsupportedFile: file.name})
//       return null
//     } else {
//       this.setState({unsupportedFile: null})
//     }

//     let that = this
//     let reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = function (e) {
//       that.props.mtStore.uploadImage(reader.result)
//       var img = new Image()
//       img.src = reader.result
//       img.onload = function () {
//         let item = {
//           id: 'uploaded/image.png',
//           image: img,
//           src: reader.result,
//           height: img.height,
//           width: img.width,
//           inference: null,
//           waitingData: false,
//           waitingInference: false
//         }
//         that.props.mtStore.setImage(item)
//         that.setState({imageKey: (that.state.imageKey + 1) % 2})
//       }
//     }
//   }

