import { observable, computed, autorun } from 'mobx'


export default class CT_Store {
    server = null
    @observable items = []

    constructor(server) {
        this.server = server
    }

    @computed get report() {
        if (this.items.length === 0)
            return "<empty>"
        return `Items: "${this.items.length}". `
    }

    add(name) {
        this.items.push({
            id: Math.ceil(Math.random() * 1234),
            name: name
        });
    }
}

