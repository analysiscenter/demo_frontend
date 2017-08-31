import React from 'react';
import { Component } from 'react';
import { LinkButton, Header } from './Common.jsx'

export class MainPage extends Component {
    render() {
        return (
            <div>
                <div>
                    <Header title={'Выберите направление'}/>               
                </div>
                <div>
                    <MainButtonGroup />
                </div>
            </div>
        );
    }
}

export class MainButtonGroup extends Component {
    render() {
        return (
            <div>
                <LinkButton title={'CT'} path={'/ct'} query={{}}/>
                <LinkButton title={'ECG'} path={'/ecg'} query={{}}/>           
            </div>
        );
    }
}
