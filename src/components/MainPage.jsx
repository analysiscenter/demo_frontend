import React from 'react';
import { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import MainButtonGroup from './MainButtonGroup.jsx'

@inject("ecg_store")
@observer
export class MainPage extends Component {
    render() {
        return (
            <div className="page main">
                <div>
                    <h1>Choose directory</h1>
                </div>

                <MainButtonGroup />        
            </div>
            
        );
    }
}
