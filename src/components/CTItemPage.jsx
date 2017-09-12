import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'


@inject("ct_store")
@observer
export default class CTItemPage extends Component {
    

    render() {
        

        return (
        <div className="page ct item">
            
        </div>
        )
    }
}
