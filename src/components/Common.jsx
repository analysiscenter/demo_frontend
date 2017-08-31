import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap'

export class LinkButton extends Component {
    render() {
        return (
            <div>
                <Button bsStyle="primary">
                    <Link to={{pathname: this.props.path, query: this.props.query }}>
                        {this.props.title}
                    </Link>
                 </Button>
            </div>
        );
    }
}

export class Header extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
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
