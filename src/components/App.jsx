import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, IndexRoute } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={MainPage} />
                <Route path="/ecg" component={EcgPage} />
                <Route path="/ct" component={EmptyPage} />               
            </div>
        );
    }
}

export class MainPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <MainButtonGroup />
            </div>
        );
    }
}

export class EcgPage extends Component {
    render() {
        return (
            <div>
                <Route exact path="/ecg" component={FullEcgPage} />
                <Route path="/ecg/patient" component={EcgPatient} />
            </div>
        );
    }
}

export class FullEcgPage extends Component {
    render() {
        return (
            <div>
                <div>
                    Choose patient
                </div>    
                <div>
                    <EcgButtonGroup />
                </div>
                <div>
                    <SimpleButton title={'Home'} path={'/'} query={{}}/>
                </div>
            </div>
        );
    }
}

export class EcgPatientInfoTable extends Component {
    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            Name
                        </Col>
                        <Col xs={12}>
                            {this.props.data.name}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            Date
                        </Col>
                        <Col xs={12}>
                            {this.props.data.date}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            Frequency
                        </Col>
                        <Col xs={12}>
                            {this.props.data.fs}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export class EcgPatientResultsTable extends Component {
    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            Риск мерцательной аритмии
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            ЧСС
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            QRS интервал
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export class EcgSignalPlot extends Component {
    render() {
        return (
            <div>
                Plot will be here
            </div>
        );
    }
}

export class EcgPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: props.location.query.pid,
            name: 'Patient ' + props.location.query.pid,
            date: '29-08-2017',
            fs: 300
        };
    }
    
    render() {
        return (
            <div>
                <div>
                    Ecg patient #{this.props.location.query.pid}
                </div>  
                
                <div>
                    <EcgPatientInfoTable data={this.state}/>
                </div>
                
                <div>
                    <EcgSignalPlot />
                </div>
                
                <div>
                    <EcgPatientResultsTable />
                </div>
                
                <div>
                    <SimpleButton title={'Choose new patient'} path={'/ecg'} query={{}}/>
                </div>
                
                <div>
                    <SimpleButton title={'Home'} path={'/'} query={{}}/>
                </div>
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
                    <SimpleButton title={'Home'} path={'/'} query={{}}/>
                </div>
            </div>
        );
    }
}

export class Header extends Component {
    render() {
        return (
            <div>
                <h1>Выберите направление</h1>
            </div>
        );
    }
}

export class SimpleButton extends Component {
    render() {
        return (
            <div>
                <button>
                    <Link to={{pathname: this.props.path, query: this.props.query }}>
                        {this.props.title}
                    </Link>
                 </button>
            </div>
        );
    }
}

export class MainButtonGroup extends Component {
    renderButton(title, path, query) {
        return <SimpleButton title={title} path={path} query={query}/>;
    }
    
    render() {
        return (
            <div>
                <SimpleButton title={'CT'} path={'/ct'} query={{}}/>
                <SimpleButton title={'ECG'} path={'/ecg'} query={{}}/>           
            </div>
        );
    }
}

export class EcgButtonGroup extends Component { 
    render() {
        return (
            <div>
                <SimpleButton title={'Patient_1'} path={'/ecg/patient'} query={{pid : 1}}/>  
                <SimpleButton title={'Patient_2'} path={'/ecg/patient'} query={{pid : 2}}/>  
                <SimpleButton title={'Patient_3'} path={'/ecg/patient'} query={{pid : 3}}/>             
            </div>
        );
    }
}

