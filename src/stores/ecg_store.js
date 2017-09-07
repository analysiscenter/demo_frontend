import { observable, autorun, action } from 'mobx'

import { ECG_API } from './const'


export default class ECG_Store {
	server = null
	@observable ready = false
	@observable items = new Map()

    constructor(server) {
    	this.server = server
    	autorun(() => this.onConnect())
		this.server.subscribe(ECG_API.ECG_GOT_LIST, this.onGotList.bind(this))
		this.server.subscribe(ECG_API.ECG_GOT_ITEM_DATA, this.onGotItemData.bind(this))
		this.server.subscribe(ECG_API.ECG_GOT_INFERENCE, this.onGotInference.bind(this))
    }

    onConnect(){
    	if ((this.items.size == 0) & this.server.ready){
		   this.server.send(ECG_API.ECG_GET_LIST)
		}
    }

	@action
	onGotList(data, meta){
		data.map((item) => this.items.set(item.id, item))
        this.ready = true
	}

	@action
	onGotItemData(data, meta){
		Object.assign(this.items[data.id], data)
	}

	@action
	onGotInference(data, meta){
		Object.assign(this.items[data.id], data)
	}

}

