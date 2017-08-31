import { observable, computed } from 'mobx';
import $ from 'jquery'; 
import axios from 'axios';

export class EcgStore {
    @observable signal = null
    @observable name = null
    @observable pid = null
    @observable frequency = null
    @observable heart_rate = null
    @observable af_prob = null
    @observable annotation = null
   
    resetReport() {
        this.heart_rate = null;
        this.af_prob = null;
        this.annotation = null;
    }

    getSignal(pid) {
        this.resetReport();
        this.pid = pid;
        console.time('signal_load');
        axios.get('http://localhost:5000/api/ecg/get_signal', {
            params: {
                pid: this.pid
            }
        })
       .then(function(response){
                this.name = response.data.name;
                this.frequency = response.data.frequency;
                this.signal = response.data.signal;
            }.bind(this)
        );
        console.timeEnd('signal_load');
    } 
    
    getReport() {
        axios.get('http://localhost:5000/api/ecg/get_analysis', {
            params: {
                pid: this.pid
            }
        })
       .then(function(response){
                this.heart_rate = response.data.heart_rate;
                this.af_prob = response.data.af_prob;
                this.annotation = response.data.annotation;
            }.bind(this)
        );
    }
}

const ecgStore = new EcgStore()

export default ecgStore
