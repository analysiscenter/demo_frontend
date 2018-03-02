import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { Grid, Row, Col, Button } from 'react-bootstrap'

export default class MainMenu extends Component {
    render() {
        return (
        <Navbar className="main-menu">
        <Col className="menu-item" xs={12} sm={6} md={4} lg={3}>
            <NavLink activeClassName="selected" exact to="/"><Icon name="home"/>Home</NavLink>
        </Col>
        <Col className="menu-item" xs={12} sm={6} md={4} lg={3}>
            <NavLink activeClassName="selected" to="/ecg"><Icon name='heartbeat'/>ECG</NavLink>
        </Col>
        <Col className="menu-item" xs={12} sm={6} md={4} lg={3}>
            <NavLink activeClassName="selected" to="/ct"><Icon name='universal-access'/>CT</NavLink>
        </Col>
        <Col className="menu-item" xs={12} sm={6} md={4} lg={3}>
            <NavLink activeClassName="selected" to="/mt"><Icon name='cog'/>Meters</NavLink>
        </Col>
        </Navbar>
        )
    }
}
