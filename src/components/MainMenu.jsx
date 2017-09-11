import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Icon } from 'react-fa'

export default class MainMenu extends Component {
    render() {
        return (
        <Navbar className="main-menu">
            <NavLink activeClassName="selected" exact to="/"><Icon name="home"/>Home</NavLink>
            <NavLink activeClassName="selected" to="/ecg"><Icon name='heartbeat'/>ECG</NavLink>
            <NavLink activeClassName="selected" to="/ct"><Icon name='universal-access'/>CT</NavLink>
        </Navbar>
        )
    }
}
