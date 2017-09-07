import React from 'react';
import { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { MainPage } from './MainPage.jsx'
import { Icon } from 'react-fa'
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';
import { CTPatientPage }  from './CTPatientPage.jsx'
import { LinkButton, EmptyPage } from './Common.jsx'
import { Tab,ListGroup,ListGroupItem, Nav, NavItem, NavLink} from 'react-bootstrap';

export class CTPage extends Component {
    render() {
        return (
            <div>
                <Route exact path="/ct" component={CTListPage} />
                <Route path="/ct/:pid" component={CTPatientPage} />
            </div>
        );
    }
}

export class CTListPage extends Component {
    render() {
        return (
            <div className="page main">
                <MainPage />
                <CTButtonGroup />
                <LinkButton title={'Home'} path={'/'} className='homeButton'/>
            </div>
        );
    }
}

const listgroupInstance = (
  <ListGroup>
    <LinkContainer to='/ct/1'><ListGroupItem bsStyle="info" header="Heading 1" >Some body text</ListGroupItem></LinkContainer>
    <LinkContainer to='/ct/2'><ListGroupItem bsStyle="info" header="Heading 2" >Linked item</ListGroupItem></LinkContainer>
    <LinkContainer to='/ct/3'><ListGroupItem bsStyle="info" header="Heading 3" >Danger styling</ListGroupItem></LinkContainer>
  </ListGroup>
);

onClick = (event) => {
   event.target.bsStyle = ""
}

export class CTButtonGroup extends Component { 
    render() {
        return listgroupInstance
    }
}
