import socket from 'socket.io-client'
import { observable } from 'mobx'
import EventEmitter from 'EventEmitter3'

import { API_Responses, SocketIOEvents, API_Events } from './const'


export default class Server extends EventEmitter {
	@observable ready = false
	@observable state = 0
	server = null
	transactions = {}

	constructor() {
		super()
		this.server = socket('http://' + window.location.hostname + ':9090' + '/api')
    }

    init() {
		// Listen to all events from server
        const onCommand = this.onCommand.bind(this)
		for(const api_key in API_Responses){
    		this.server.on(api_key, onCommand)
		}

		for(const state in SocketIOEvents){
			this.server.on(state, this.onStateChange.bind(this, state))
		}

		this.server.on(SocketIOEvents.CONNECTING, this.connecting.bind(this))
		this.server.on(SocketIOEvents.CONNECT, this.connect.bind(this))
		this.server.on(SocketIOEvents.CONNECT_ERROR, this.connect_error.bind(this))
		this.server.on(SocketIOEvents.DISCONNECT, this.disconnect.bind(this))
		this.server.on(SocketIOEvents.RECONNECTING, this.reconnecting.bind(this))
		this.server.on(SocketIOEvents.RECONNECT, this.reconnect.bind(this))
	}

	subscribe(event, callback, self) {
		if (self) callback = callback.bind(self)
		this.on(event, callback)
	}

	unsubscribe(event, callback) {
		this.off(event, callback)
	}

	onStateChange(state) {
		this.state = state
	}

	connecting() {
	}

	connect() {
		this.ready = true
	}

	connect_error() {
	}

	disconnect() {
		this.ready = false
		console.log("... disconnected ...")
	}

	reconnecting() {
	}

	reconnect() {
	}

	startTransaction() {
		const trans_id = Math.ceil(Math.random() * 123456789)
		this.transactions[trans_id] = {id: trans_id, state: 0}
		return trans_id
	}

	endTransaction(trans_id) {
		delete this.transactions[trans_id]
	}

	onCommand(payload) {
		const isMine = this.server.id == payload.meta.sessionid
		this.emit(payload.event, payload.data, payload.meta)
	}

	send(event, data, trans) {
		const meta = { sessionid: this.server.id, transaction: trans }
		this.server.emit(event, data, meta)
	}
}
