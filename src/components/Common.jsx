import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import CircularProgressbar from 'react-circular-progressbar';

export class LinkButton extends Component {
    render() {
        return (
            <div>
                <Button bsStyle="default" className={this.props.className}>
                    <Link to={{pathname: this.props.path}} style={{ textDecoration: 'none' }}>
                          {this.props.title} 
                    </Link>
                </Button>
            </div>
        );
    }
}

export class EmptyPage extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>Sorry, page does not exist</h2>
                </div>
                <div>
                    <LinkButton title={'Home'} path={'/'} query={{}}/>
                </div>
            </div>
        );
    }
}
