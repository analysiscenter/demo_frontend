import React from 'react';
import { Component } from 'react';
import { Icon } from 'react-fa'

export default class LoadSpinner extends Component {      
    render() {
        return (
            <div>
                <Icon name='spinner' className='Big' spin></Icon>
                <span>Loading signal</span>
            </div>
        )
    }
}
