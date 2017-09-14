import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'

import LoadingSpinner from './LoadingSpinner.jsx'
import EcgSignalPlot from './EcgSignalPlot.jsx';
import EcgItemResults from './EcgItemResults.jsx'


@inject("ecg_store")
@observer
export default class CTItemPage extends Component {
    constructor(props) {
        super(props)
    }

    handleInference() {
        this.props.ecg_store.getInference(this.props.match.params.id)
    }

    renderPage(item) {
        const annotation = item.inference? [item.inference.qrs_segments, item.inference.p_segments, item.inference.t_segments] : null

        return (
        <Row>
            { item.signal ?
                <EcgSignalPlot signal={item.signal} fs={item.frequency} annotation={annotation} />
              :
              null
            }
            { item.inference ?
                <Row>
                    <EcgItemResults pid={item.id}/>
                </Row>
            : null
            }

            { item.inference ? null :
                <Button bsStyle="success" className="get-inference" onClick={this.handleInference.bind(this)}>
                    { item.waitingInference ?
                        <Icon name="spinner" spin />
                      :
                        <span><Icon name="check-circle-o" /><span>Click to predict</span></span>
                    }
                </Button>
            }
        </Row>
        )
    }

    renderPageLoading() {
        return <LoadingSpinner text="Loading..." />
    }

    render() {
        const item = this.props.ecg_store.get(this.props.match.params.id)

        return (
        <div className="page ecg item">
            <Grid fluid>
            <Row>
                <Col xs={12}>
                    <h2>Patient {(item != undefined) ? item.name : null}</h2>
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
