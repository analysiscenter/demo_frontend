import { observable, autorun, computed, action, extendObservable } from 'mobx'

import { API_Events } from './const'


const item_template = {
    id: null, name: null, image:null, imageBitmap:null, mask: null, decision:null, waitingDecision:false
}


export default class CT_Store {
    server = null
    @observable ready = false
    @observable items = new Map()

    constructor(server) {
        this.server = server
        autorun(() => this.onConnect())
        this.server.subscribe(API_Events.CT_GOT_LIST, this.onGotList.bind(this))
        this.server.subscribe(API_Events.CT_GOT_ITEM_DATA, this.onGotItemData.bind(this))
        this.server.subscribe(API_Events.CT_GOT_INFERENCE, this.onGotInference.bind(this))
    }

    onConnect(){
        if ((this.items.size == 0) & this.server.ready){
            this.server.send(API_Events.CT_GET_LIST)
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
    }

    @action
    onGotInference(data, meta){
        this.items.get(data.id).waitingDecision = false
        extendObservable(this.items.get(data.id), data)
    }

    getItemData(id) {
        this.server.send(API_Events.CT_GET_ITEM_DATA, {id: id})
    }

    @action
    getInference(id) {
        this.items.get(id).waitingDecision = true
        this.server.send(API_Events.CT_GET_INFERENCE, {id: id})
    }

    getImageSlice(id, slice_no) {
        const item = this.items.get(id)
        const sourceImage = item.image[slice_no].peek()
        const bitmapImage = new Uint8ClampedArray(sourceImage.length * sourceImage[0].length * 4)

        for(let i=0; i< sourceImage.length; i++){
            for(let j=0; j< sourceImage[i].length; j++){
                const pos = i*sourceImage[i].length*4 + j*4
                bitmapImage[pos + 0] = sourceImage[i][j]
                bitmapImage[pos + 1] = sourceImage[i][j]
                bitmapImage[pos + 2] = sourceImage[i][j]
                bitmapImage[pos + 3] = 255
            }
        }
        return new ImageData(bitmapImage, sourceImage[0].length, sourceImage.length)
    }
}
