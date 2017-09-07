import { observable, computed, autorun } from 'mobx'


export default class CT_Store {
	server = null
	@observable items = []

    constructor() {
    	this.server = server
        autorun(() => console.log(this.report))
    }

	@computed get report() {
		if (this.items.length === 0)
			return "<empty>"
		return `Next item: "${this.items[0].item}". `
	}

	add(item) {
		this.items.push({
			item: item
		});
	}
}

