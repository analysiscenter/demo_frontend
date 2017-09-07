import React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';

import { observable } from 'mobx'; 
import { Button } from 'react-bootstrap'

import ecgStore from './Stores.jsx'

@observer
export default class ActionButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isRunning: false
        }; 
    }

    render() {
        let isRunning = this.state.isRunning;
        if (ecgStore.isProcessed) {
            isRunning = false;
        }
        return (
            <Button bsStyle="primary"
                    disabled={isRunning || ecgStore.isProcessed}
                    onClick={!ecgStore.isProcessed ? this.handleClick : null}>
                {isRunning ? 'Analysis is in progress...' : ecgStore.isProcessed ? 'Analysis is done' : 'Run analysis'}
            </Button>
        );
    }

    handleClick() {
        this.setState({isRunning: true});
        ecgStore.getReport();
    }
}
