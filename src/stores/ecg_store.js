import { observable, computed, autorun } from 'mobx'


class ECG_Store {
	@observable items = []

    constructor() {
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


const ecg_store = new ECG_Store()

export default ecg_store
