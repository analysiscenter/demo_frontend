import React from 'react';
import { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';

export default class ChangingProgressbar extends React.Component {
    static defaultProps = {
        interval: 30
    };
    
    constructor(props) {
        super(props);
        this.state = {
            currentPercentageIndex: 0,
        };
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.currentPercentageIndex < this.props.percentages.length - 1) {
                this.setState({
                    currentPercentageIndex: this.state.currentPercentageIndex + 1
                });
            }
        }, this.props.interval);
    }
    
    render() {
        return (
            <div className='Big'>
                <CircularProgressbar {...this.props} 
                        percentage={this.props.percentages[this.state.currentPercentageIndex]} />
            </div>
        );
    }
    
}
