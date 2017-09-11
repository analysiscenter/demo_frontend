import React from 'react';
import { Component } from 'react';
import { Icon } from 'react-fa'
import { Grid, Row, Col } from 'react-bootstrap'

export default class LoadSpinner extends Component {      
    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Icon name='spinner' spin></Icon>
                    </Row>
                    <Row>
                        <span>Loading signal</span>
                    </Row>    
                </Grid>
            </div>
        )
    }
}
