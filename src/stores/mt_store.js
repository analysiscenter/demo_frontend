import { observable, autorun, action, extendObservable } from 'mobx'

import { API_Events } from './const'


const item_template = {
   id: null,
   img: null,
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
    
    makeImage(sourceData, height, width){
        const bitmapImage = new Uint8ClampedArray(sourceData.length * 4 / 3)
         for(let i=0; i< bitmapImage.length / 4; i++){
                bitmapImage[4 * i + 0] = sourceData[3 * i + 0]
                bitmapImage[4 * i + 1] = sourceData[3 * i + 1]
                bitmapImage[4 * i + 2] = sourceData[3 * i + 2]
                bitmapImage[4 * i + 3] = 255
         }

        return new ImageData(bitmapImage, height, width)
    }
    
    getImage(id){
        const item = this.items.get(id)
        const image = item.img
        const height = item.height
        const width = item.width
        return this.makeImage(image, height, width)
    }
}
