import { observable, autorun, action, extendObservable } from 'mobx'

import { API_Events } from './const'


const item_template = {
   id: null,
   image: null,
   height: null,
   width: null,
   inference: null,
   waitingData: false,
   waitingInference: false
}


export default class MT_Store {
    server = null
    @observable ready = false
    @observable items = new Map()

    constructor(server) {
        this.server = server
        autorun(() => this.onConnect())
        this.server.subscribe(API_Events.MT_GOT_LIST, this.onGotList.bind(this))
        this.server.subscribe(API_Events.MT_GOT_ITEM_DATA, this.onGotItemData.bind(this))
        this.server.subscribe(API_Events.MT_GOT_INFERENCE, this.onGotInference.bind(this))
    }

    onConnect(){
        if ((this.items.size == 0) & this.server.ready){
            this.server.send(API_Events.MT_GET_LIST)
        }
    }

    @action
    onGotList(data, meta){
        data.map((item) => this.items.set(item.id, Object.assign({}, item_template, item)))
        this.ready = true
    }

    @action
    onGotItemData(data, meta){
        extendObservable(this.items.get(data.id), data)
        this.items.get(data.id).waitingData = false
    }

    @action
    onGotInference(data, meta){
        extendObservable(this.items.get(data.id), data)
        this.items.get(data.id).waitingInference = false
    }

    getItemData(id) {
        const item = this.items.get(id)
        if (item != undefined)
            if (!item.waitingData){
                item.waitingData = true
                this.server.send(API_Events.MT_GET_ITEM_DATA, {id: id})
            }
    }

    getInference(id) {
        if (!this.items.get(id).waitingInference){
            this.items.get(id).waitingInference = true
            this.server.send(API_Events.MT_GET_INFERENCE, {id: id})
        }
    }

    getImage(id){
        const item = this.items.get(id)
        item.image = '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'

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let image = new Image()
        image.onload = function(){
            ctx.drawImage(image, 0, 0, item.width, item.height)
        }
        image.src = 'data:image/png;base64,' + item.image

        const imageData = ctx.getImageData(0, 0, item.width, item.height)
        return image.src
    }
}
