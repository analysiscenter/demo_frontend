import React from 'react';
import { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { observable } from 'mobx'; 
import { Button } from 'react-bootstrap'

@inject("ecg_store")
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
        let isProcessed = this.props.ecg_store.items.get(this.props.pid).annotation !== null;
        if (isProcessed) {
            isRunning = false;
        }
        return (
            <div>
                <Button bsStyle="primary"
                        disabled={isRunning || isProcessed}
                        onClick={isProcessed ? null : this.handleClick }>
                    {isRunning ? 'Analysis is in progress...' : isProcessed ? 'Analysis is done' : 'Run analysis'}
                </Button>
            </div>
        );
    }

    handleClick() {
        this.setState({isRunning: true});
        this.props.ecg_store.getReport(this.props.pid);
    }
}
