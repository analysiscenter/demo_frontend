import { observable, autorun, action, extendObservable } from 'mobx'

import { API_Events } from './const'


const item_template = {
    id: null, name: null, image: null, mask: null, decision:null
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
        extendObservable(this.items.get(data.id), data)
    }

    getData(id) {
        this.server.send(API_Events.CT_GET_ITEM_DATA, {id: id})
    }

    getInference(id) {
        this.server.send(API_Events.CT_GET_INFERENCE, {id: id})
    }
}
