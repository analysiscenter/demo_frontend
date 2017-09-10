import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Icon } from 'react-fa'

export default class MainMenu extends Component {
    render() {
        return (
        <Navbar className="main-menu">
            <div><NavLink activeClassName="selected" exact to="/"><Icon name="home"/>Home</NavLink></div>
            <div><NavLink activeClassName="selected" to="/ecg"><Icon name='heartbeat'/>ECG</NavLink></div>
            <div><NavLink activeClassName="selected" to="/ct"><Icon name='universal-access'/>CT</NavLink></div>
        </Navbar>
        )
    }
}
