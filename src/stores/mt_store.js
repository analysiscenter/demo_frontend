import { observable, autorun, action, extendObservable, toJS } from 'mobx'

import { API_Events } from './const'

const itemTemplate = {
  id: null,
  image: null,
  src: null,
  height: null,
  width: null,
  inference: null,
  waitingData: false,
  waitingInference: false,
  uploaded: false
}

export default class MtStore {
  server = null
  @observable ready = false
  @observable items = new Map()

  constructor (server) {
    this.server = server
    autorun(() => this.onConnect())
    this.server.subscribe(API_Events.MT_GOT_LIST, this.onGotList.bind(this))
    this.server.subscribe(API_Events.MT_GOT_ITEM_DATA, this.onGotItemData.bind(this))
    this.server.subscribe(API_Events.MT_GOT_INFERENCE, this.onGotInference.bind(this))
  }

  onConnect () {
    if ((this.items.size == 0) & this.server.ready) {
      this.server.send(API_Events.MT_GET_LIST)
    }
  }

  @action
  onGotList (data, meta) {
    // data.map((item) => this.items.set(item.id, Object.assign({}, item_template, item)))
    this.ready = true
  }

  @action
  onGotItemData (data, meta) {
    extendObservable(this.items.get(data.id), data)
    this.items.get(data.id).waitingData = false
    this.makeImage(data.id)
  }

  @action
  onGotInference (data, meta) {
    console.log('onGotInference', data.id)
    extendObservable(this.items.get(data.id), data)
    this.items.get(data.id).waitingInference = false
  }

  @action
  getItemData (id) {
    const item = this.items.get(id)
    if (item != undefined) {
      if (!item.waitingData) {
        item.waitingData = true
        this.server.send(API_Events.MT_GET_ITEM_DATA, {id: id})
      }
    }
  }

  getInference (id) {
    if (!this.items.get(id).waitingInference) {
      this.items.get(id).waitingInference = true
      this.server.send(API_Events.MT_GET_INFERENCE, {id: id})
    }
  }

  uploadImage (data) {
    console.log('uploadImage')
    this.server.send(API_Events.MT_UPLOAD_IMAGE, {data: data}, {})
  }

  @action
  makeImage (id) {
    const item = this.items.get(id)
    const data = toJS(item)

    const canvas = document.createElement('canvas')
    canvas.width = item.width
    canvas.height = item.height
    const ctx = canvas.getContext('2d')
    console.log('makeImage', item.width, item.height)

    let image = new Image()
    image.onload = function () {
      ctx.drawImage(image, 0, 0)
      data.image = ctx.getImageData(0, 0, item.width, item.height)
      extendObservable(item, data)
      console.log('makeImage', data.image)
    }
    const src = new Uint8Array(data.src).reduce((data, byte) => data + String.fromCharCode(byte), '')
    image.src = 'data:image/jpeg;base64,' + src
  }

  getImage (id) {
    const item = this.items.get(id)
    return item.image
  }
}
