import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'

import LoadingSpinner from './LoadingSpinner.jsx'
import EcgSignalPlot from './EcgSignalPlot.jsx';
import EcgPatientResultCharts from './EcgPatientResultCharts.jsx'


@inject("ecg_store")
@observer
export default class CTItemPage extends Component {
    constructor(props) {
        super(props)
        props.ecg_store.getItemData(props.match.params.id)
        this.state = {}
    }

    handleInference() {
        this.props.ecg_store.getInference(this.props.match.params.id)
    }

    renderPage(item) {
        return (
        <Row>
            <EcgSignalPlot signal={item.signal} fs={item.frequency} annotation={item.annotation} />
            { item.af_prob ?
                <Row>
                    <EcgPatientResultCharts pid={item.id}/>
                </Row>
            : null
            }

            <Button bsStyle="success" className="get-inference" onClick={this.handleInference.bind(this)} disabled={!!item.annotation}>
                { item.waitingDecision ?
                    <Icon name="spinner" spin />
                  :
                    "Predict"
                }
            </Button>
        </Row>
        )
    }

    renderPageLoading() {
        return <LoadingSpinner text="Loading..." />
    }

    render() {
        const item = this.props.ecg_store.items.get(this.props.match.params.id)

        return (
        <div className="page ecg item">
            <Grid fluid>
            <Row>
                <Col xs={12}>
                    <h2>Patient {this.props.match.params.id}</h2>
                </Col>
            </Row>
            {(item === undefined) ?
             this.renderPageLoading()
             :
             this.renderPage(item)
            }
            </Grid>
        </div>
        )
    }
}
