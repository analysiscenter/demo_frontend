import React from 'react';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import { EcgPatient }  from './EcgPatient.jsx'
import { LinkButton, Header } from './Common.jsx'

export class EcgPage extends Component {
    render() {
        return (
            <div>
                <Route exact path="/ecg" component={FullEcgPage} />
                <Route path="/ecg/patient" component={EcgPatient} />
            </div>
        );
    }
}

export class FullEcgPage extends Component {
    render() {
        return (
            <div>
                <div>
                    <Header title={'Choose patient'} />
                </div>    
                <div>
                    <EcgButtonGroup />
                </div>
                <div>
                    <LinkButton title={'Home'} path={'/'} query={{}}/>
                </div>
            </div>
        );
    }
}

export class EcgButtonGroup extends Component { 
    render() {
        return (
            <div>
                <LinkButton title={'Patient_1'} path={'/ecg/patient'} query={{pid : 1}}/>  
                <LinkButton title={'Patient_2'} path={'/ecg/patient'} query={{pid : 2}}/>  
                <LinkButton title={'Patient_3'} path={'/ecg/patient'} query={{pid : 3}}/>             
            </div>
        );
    }
}
