import { observable, computed, autorun, action } from 'mobx'

import { ECG_Responses } from './const'


export default class ECG_Store {
	server = null
	@observable items = {}

    constructor(server) {
    	this.server = server
        autorun(() => console.log(this.report))

		this.server.subscribe(ECG_Responses.ECG_GOT_LIST, this.onGotList.bind(this))
		this.server.subscribe(ECG_Responses.ECG_GOT_ITEM_DATA, this.onGotItemData.bind(this))
		this.server.subscribe(ECG_Responses.ECG_GOT_INFERENCE, this.onGotInference.bind(this))
    }

	@computed get report() {
		if (this.items.length === 0)
			return "<empty>"
		return this.items
	}

	@action
	onGotList(data, meta){
		for(item in data){
			this.items[item.id] = item
		}
	}

	@action
	onGotItemData(data, meta){
		Object.assign(this.item[data.id], data)
	}

	@action
	onGotInference(data, meta){
		Object.assign(this.item[data.id], data)
	}

}

