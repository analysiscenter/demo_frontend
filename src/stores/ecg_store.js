import { observable, autorun, action, extendObservable } from 'mobx'

import { API_Events } from './const'


const item_template = {
   id: null,
   is_annotated: null,
   timestamp: null,
   sha: null,
   name: null,
   signal: null,
   frequency: null,
   age: null,
   date: null,
   units: null,
   lead: null,
   signame: null,
   annotation: [],
   inference: null,
   waitingData: false
};

const annotation_template = {
   id: null,
   annotations: []
};

const common_annotation_template = {
   id: null,
   annotations: []
};

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
}; 


export default class ECG_Store {
    server = null
    @observable ready = true
    @observable ready_ecg_list = false
    @observable ready_annotation_list = false
    @observable annotation_list = new Map()
    @observable common_annotations = new Map()
    @observable items = new Map()

    constructor(server) {
        this.server = server
        autorun(() => this.onConnect())
        this.server.subscribe(API_Events.ECG_GOT_LIST, this.onGotList.bind(this))
        this.server.subscribe(API_Events.ECG_GOT_ANNOTATION_LIST, this.onGotAnnotationList.bind(this))
        this.server.subscribe(API_Events.ECG_GOT_COMMON_ANNOTATION_LIST, this.onGotCommonAnnotationList.bind(this))
        this.server.subscribe(API_Events.ECG_GOT_ITEM_DATA, this.onGotItemData.bind(this))
    }

    onConnect(){
        if ((this.items.size == 0) & this.server.ready){
            this.server.send(API_Events.ECG_GET_LIST);
            this.server.send(API_Events.ECG_GET_ANNOTATION_LIST);
            this.server.send(API_Events.ECG_GET_COMMON_ANNOTATION_LIST, {n_top: 4});
        }
    }
    
    @action
    onGotList(data, meta){
        // console.log("GOT LIST", data)
        var new_ids = [];
        for (let item of data) {
            if (!this.items.has(item.id)) {
                this.items.set(item.id, Object.assign({}, item_template, item));
            }
            new_ids.push(item.id);
        };
        for (let id of this.items.keys()) {
            if (!new_ids.includes(id)) {
                this.items.delete(id);
            }
        };
        // console.log("STORE CONTAINS", this.items.size);
        // sleep(300);
        this.ready_ecg_list = true;
    }
    
    @action
    onGotAnnotationList(data, meta){
        // console.log("GOT ANNOTATION LIST", data)
        data.map((item) => this.annotation_list.set(item.id, Object.assign({}, annotation_template, item)))
        // sleep(300);
        this.ready_annotation_list = true;
    }
    
    @action
    onGotCommonAnnotationList(data, meta){
        this.common_annotations.clear();
        data.annotations.forEach( (item, id) => {
            this.common_annotations.set(id, item);
            // console.log("COMMON ANNOTATION", item);
        });
    }
    
    @action
    onGotItemData(data, meta){
        extendObservable(this.items.get(data.id), data)
        this.items.get(data.id).waitingData = false
    }


    getItemData(id) {
        const item = this.items.get(id)
        if (item != undefined)
            if (!item.waitingData){
                item.waitingData = true
                this.server.send(API_Events.ECG_GET_ITEM_DATA, {id: id})
            }
    }
    
    setAnnotation(id, annotation) {
        this.server.send(API_Events.ECG_SET_ANNOTATION, {id: id, annotation: annotation})
    }
    
    getTop() {
        this.server.send(API_Events.ECG_GET_COMMON_ANNOTATION_LIST, {n_top: 4})
    }

    get(id) {
        const item = this.items.get(id)
        if (item != undefined)
            if (item.signal == null)
                this.getItemData(id)
        return item
    }
}
