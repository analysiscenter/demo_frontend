import Server from './server'
import ECG_Store from './ecg_store'
import CT_Store from './ct_store'

const server = new Server()
server.init()
const ecg_store = new ECG_Store(server)
const ct_store = new CT_Store(server)

export { server, ct_store, ecg_store }
