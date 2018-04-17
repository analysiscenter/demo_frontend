import { observable, autorun, action, extendObservable } from 'mobx'

import { API_Events } from './const'

const itemTemplate = {
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
}

const annotationTemplate = {
  id: null,
  annotations: []
}

export default class EcgStore {
  server = null
  @observable ready = true
  @observable readyEcgList = false
  @observable readyAnnotationList = false
  @observable annotationList = new Map()
  @observable commonAnnotations = new Map()
  @observable items = new Map()

  constructor (server) {
    this.server = server
    autorun(() => this.onConnect())
    this.server.subscribe(API_Events.ECG_GOT_LIST, this.onGotList.bind(this))
    this.server.subscribe(API_Events.ECG_GOT_ANNOTATION_LIST, this.onGotAnnotationList.bind(this))
    this.server.subscribe(API_Events.ECG_GOT_COMMON_ANNOTATION_LIST, this.onGotCommonAnnotationList.bind(this))
    this.server.subscribe(API_Events.ECG_GOT_ITEM_DATA, this.onGotItemData.bind(this))
  }

  onConnect () {
    if ((this.items.size === 0) & this.server.ready) {
      this.server.send(API_Events.ECG_GET_LIST)
      this.server.send(API_Events.ECG_GET_ANNOTATION_LIST)
      this.server.send(API_Events.ECG_GET_COMMON_ANNOTATION_LIST, {})
    }
  }

  @action
  onGotList (data, meta) {
    var newIds = []
    for (let item of data) {
      if (!this.items.has(item.id)) {
        this.items.set(item.id, Object.assign({}, itemTemplate, item))
      }
      newIds.push(item.id)
    };
    for (let id of this.items.keys()) {
      if (!newIds.includes(id)) {
        this.items.delete(id)
      }
    };
    this.readyEcgList = true
  }

  @action
  onGotAnnotationList (data, meta) {
    data.map((item) => this.annotationList.set(item.id, Object.assign({}, annotationTemplate, item)))
    this.readyAnnotationList = true
  }

  @action
  onGotCommonAnnotationList (data, meta) {
    this.commonAnnotations.clear()
    data.annotations.forEach((item, id) => {
      this.commonAnnotations.set(id, item)
    })
  }

  @action
  onGotItemData (data, meta) {
    extendObservable(this.items.get(data.id), data)
    this.items.get(data.id).waitingData = false
  }

  getItemData (id) {
    const item = this.items.get(id)
    if (item !== undefined) {
      if (!item.waitingData) {
        item.waitingData = true
        this.server.send(API_Events.ECG_GET_ITEM_DATA, {id: id})
      }
    }
  }

  setAnnotation (id, annotation) {
    this.server.send(API_Events.ECG_SET_ANNOTATION, {id: id, annotation: annotation})
  }

  get (id) {
    const item = this.items.get(id)
    if (item !== undefined) {
      if (item.signal == null) { this.getItemData(id) }
    }
    return item
  }
}
