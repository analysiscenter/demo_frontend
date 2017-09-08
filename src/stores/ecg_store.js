import { observable, autorun, action } from 'mobx'

import { API_Events } from './const'


export default class ECG_Store {
    server = null
    @observable ready = false
    @observable items = new Map()

    constructor(server) {
        this.server = server
        autorun(() => this.onConnect())
        this.server.subscribe(API_Events.ECG_GOT_LIST, this.onGotList.bind(this))
        this.server.subscribe(API_Events.ECG_GOT_ITEM_DATA, this.onGotItemData.bind(this))
        this.server.subscribe(API_Events.ECG_GOT_INFERENCE, this.onGotInference.bind(this))
    }

    onConnect(){
        if ((this.items.size == 0) & this.server.ready){
           this.server.send(API_Events.ECG_GET_LIST)
        }
    }

    @action
    onGotList(data, meta){
        data.map((item) => this.items.set(item.id, item))
        this.ready = true
    }

    @action
    onGotItemData(data, meta){
        this.items.set(data.id, Object.assign(this.items.get(data.id), data))
    }

    @action
    onGotInference(data, meta){
        this.items.set(data.id, Object.assign(this.items.get(data.id), data))
    }

    getSignal(id) {
        this.server.send(API_Events.ECG_GET_ITEM_DATA, {id: id})
    }

    getReport(id) {
        this.server.send(API_Events.ECG_GET_INFERENCE, {id: id})
    }
}
