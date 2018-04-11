import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Clearfix, Button, FormGroup, Checkbox, FormControl } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import LoadingSpinner from './LoadingSpinner.jsx'
import EcgSignalPlot from './EcgSignalPlot.jsx';

@inject("ecg_store")
@observer
export default class EcgPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            all_channels: true,
            selected_channel: 0,
            view_all_channels: true,
            channel: [],
            pid: null,
            annotation: [],
            descent_sort: false,
            signame: null,
            hide_annotated: false,
            show_groups: [],
            search_string: '',
            collapse_groups: true,
            show_common: true,
            browser_width: 0,
            browser_height: 0,
            current_ecg_list_key: 0
        };  
           
        this.handleAllChannels = this.handleAllChannels.bind(this);
        this.handleHideAnnotated = this.handleHideAnnotated.bind(this);
        this.handleShowGroups = this.handleShowGroups.bind(this);      
        this.handleSelectChannel = this.handleSelectChannel.bind(this);
        this.handleCheckAnnotation = this.handleCheckAnnotation.bind(this);
        this.handleLayoutChange = this.handleLayoutChange.bind(this);
        this.handleEcgSelect = this.handleEcgSelect.bind(this);
        this.handleAnnSelect = this.handleAnnSelect.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCollapseGroups = this.handleCollapseGroups.bind(this);
        this.handleCollapseCommon = this.handleCollapseCommon.bind(this); 
    }
    
    handleShowGroups(value) {
        if (this.state.show_groups.includes(value)) {
            var filtered = this.state.show_groups.filter(t => t !== value)
            this.setState({show_groups: filtered});
        }
        else {
            this.setState({show_groups: this.state.show_groups.concat(value)});
        }
    }
    
    handleCheckAnnotation(e) {
        let value = e.target.value;
        if (this.state.annotation.includes(value)) {
            var filtered = this.state.annotation.filter(t => t !== value)
            this.setState({annotation: filtered});
        }
        else {
            this.setState({annotation: this.state.annotation.concat(value)});
        }
    }
    
    handleHideAnnotated(e) {
        this.setState({hide_annotated: !this.state.hide_annotated});
    }
    
    handleCollapseGroups(e) {
        if (!this.state.collapse_groups) {
            this.setState({show_groups: []});
        }
        else {
            var all_groups = [];
            for (let item of this.props.ecg_store.annotation_list.values()) {
                {item.annotations.length > 0 ? all_groups.push(item.id) : null}
            }
            this.setState({show_groups: all_groups});
        }
        this.setState({collapse_groups: !this.state.collapse_groups});
    }
    
    handleCollapseCommon(e) {
        this.setState({show_common: !this.state.show_common});
    }
    
    handleAllChannels(e) {
        this.setState({all_channels: !this.state.all_channels});
    }
    
    handleSelectChannel(e) {
        let value = parseInt(e.target.value);
        this.setState({selected_channel: value});      
    }
    
    handleLayoutChange(e) {
        this.setState({view_all_channels: !this.state.view_all_channels});
    }
    
    handleSubmit(e) {
        let pid = this.state.pid;
        var item = this.props.ecg_store.items.get(pid);
        
        item.annotation = this.state.annotation;
        item.is_annotated = true;
        this.props.ecg_store.setAnnotation(pid, this.state.annotation);
        this.setState({annotation: []});
    }
    
    handleSort(e) {
        this.setState({descent_sort: !this.state.descent_sort});
    }
    
    handleAnnSelect(e) {
        this.setState({annotation: this.state.annotation.concat(e.target.value)});
    }
    
    handleEcgSelect(e) {
        this.setState({pid: e.target.value});
    }
    
    showEcgName(item, key) {
        if (this.state.hide_annotated && item.is_annotated)
        {
            return null
        }
        else {
            return (
                <option value={item.id}
                        key={key}
                        style={{color: item.is_annotated ? '#28a745' : "black"}}
                        className="font100">
                    {item.timestamp.slice(0, 5) + item.timestamp.slice(10, 16)}
                </option>
            )
        }
        
    }

    sortedList() {        
        function parseEcgDate(str) {
            return new Date(str.slice(6, 10) + '-' + 
                            str.slice(3, 5) + '-' +
                            str.slice(0, 2) + 'T' +
                            str.slice(11, 19));
        }
        
        var sorted = this.props.ecg_store.items.values().sort(function(a, b) {
                        return(parseEcgDate(b.timestamp) - parseEcgDate(a.timestamp))}) 
        
        if (this.state.descent_sort) {
            return (
                sorted.map( (item, key) => this.showEcgName(item, key) )                            
            )
        }
        else {
            return (
                sorted.slice(0).reverse().map( (item, key) => this.showEcgName(item, key) )                             
            )
        }
    }
    
    renderEcgList() {
        return (
        <Row>
            <FormGroup controlId="formControlsSelectMultiple" key={this.state.current_ecg_list_key}>
                <FormControl componentClass="select"
                             className="list"
                             multiple
                             value={this.state.pid !== null ? [this.state.pid] : ['']}
                             onChange={this.handleEcgSelect}>
                    { this.sortedList() }
                </FormControl>
            </FormGroup>
        </Row>
        )
    }
    
    renderCommonDiagnose(diagnose) {
        return (
        <Row>
            <Checkbox value={diagnose}
                      checked={this.state.annotation.includes(diagnose)}
                      onChange={this.handleCheckAnnotation}>               
                      {diagnose.split('/').slice(-1)[0]}
            </Checkbox> 
        </Row>
        )
    }
    
    renderDiagnoseGroup(group_name, diagnoses) {
        if (diagnoses.length == 0) {
            if (group_name.toLowerCase().includes(this.state.search_string)) {
                return (
                    <Checkbox value={group_name}
                              checked={this.state.annotation.includes(group_name)}
                              onChange={this.handleCheckAnnotation}>{group_name}</Checkbox>
                )
            }
            else {
                return null
            }
        }
        else {
            var mask_diagnoses = diagnoses.filter(x => x.toLowerCase().includes(this.state.search_string));
            let collapsed = !(this.state.show_groups.includes(group_name) || (this.state.search_string.length > 0))
            return (
            <Row className={collapsed ? "collapsed_group" : "enrolled_group"}>
                <span> 
                    <Icon value={group_name}
                          name={!collapsed ? "angle-down" : "angle-right"}
                          onClick={this.handleShowGroups.bind(this, group_name)} />
                        <span className="group_name">{group_name}</span>
                </span>
            
                { !collapsed ?
                    <Row className="group_annotations">
                    {mask_diagnoses.map( (item, key) => 
                        <Checkbox value={group_name + '/' + item}
                                  key={key}  
                                  checked={this.state.annotation.includes(group_name + '/' + item)}
                                  onChange={this.handleCheckAnnotation}>{item}</Checkbox> )}
                    </Row>
                  :
                  null
                }
            </Row>
            )
        }
    }
 
    renderDiagnose() {
        return (
        <Row>
            {this.props.ecg_store.annotation_list.values().map(item => 
                this.renderDiagnoseGroup(item.id, item.annotations))}
        </Row>
        )                       
    }
    
    renderCheckBox() {
        let item = this.props.ecg_store.get(this.state.pid);
        if (item.signame !== null) {
            let channels = [...Array(item.signame.length).keys()];
                 
            return (
            <Row className="button-group">
                {channels.map( (x, key) => <Button value={x} 
                                            key={key}
                                            type="submit" 
                                            className="set_channel"
                                            onClick={this.handleSelectChannel} 
                                            bsStyle={(this.state.selected_channel === x) ?
                                                        "primary": "default"}>{item.signame[x]}</Button> )}
            </Row>
            )
        }
    }
    
    renderSelectedChannel(item) {
        let x = this.state.selected_channel;
        return (
            <EcgSignalPlot signal={item.signal[x]}
                           id={item.id + x}
                           fs={item.frequency}
                           signame={item.signame}
                           layout_type="1x1"
                           width={0.65 * this.state.browser_width}
                           height={0.7 * this.state.browser_height}
                           div_id='subplots'/> 
        )
    }
    
    renderGridPlot(layout_type) {        
        let item = this.props.ecg_store.get(this.state.pid);
        if (item == undefined) {
            return null
        }
        if (item.waitingData) {
            return null
        }
        if (this.state.view_all_channels) {
            return (
                <EcgSignalPlot signal={item.signal}
                               id={item.id}
                               fs={item.frequency} 
                               signame={item.signame}
                               layout_type="6x2"
                               width={0.65 * this.state.browser_width}
                               height={0.7 * this.state.browser_height}
                               div_id='subplots'/>
            )
        }
        else {
            return (
                <Col>
                    <Row>
                        {this.renderCheckBox()}
                    </Row>
                    <Row>
                        {this.renderSelectedChannel(item)}
                    </Row>
                </Col>
            )
        }
    }
    
    renderSearch() {
        return (
            <FormGroup controlId="formBasicText">
                <FormControl type="text"
                             placeholder="Текст для поиска"
                             className="search_line"
                             onChange={e => this.setState({search_string: e.target.value.toLowerCase()})}/>
            </FormGroup>
        )
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        var item = prevProps.ecg_store.items.get(prevState.pid);       
        if (item === undefined & prevState.pid !== null) {
            this.setState({pid: null,
                           current_ecg_list_key: this.state.current_ecg_list_key + 1});
        }
    }
    
    updateDimensions() {  
        this.setState({browser_width: window.innerWidth,
                       browser_height: window.innerHeight});
    }
    
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
                      
    render() {        
        if (!this.props.ecg_store.ready_ecg_list | !this.props.ecg_store.ready_annotation_list) {
            return (
                <LoadingSpinner />
            )
        }
        else {
            return (
            <div className="page">
                <Grid fluid>
                <Row>
                    <Col className="left_column">
                        <div>
                        <Row>
                            <span className='ecg_list_header'>Список ЭКГ</span>
                        </Row>
                        <Row>
                            <a href="#" className="onleft" onClick={this.handleHideAnnotated}>
                                {this.state.hide_annotated ? "Показать все" : "На расшифровку"}
                            </a>
                        </Row>
                        <Row>
                            <a href="#" className="onleft" onClick={this.handleSort}>
                                {this.state.descent_sort ? "Сначала старые" : "Сначала новые"}
                            </a>
                        </Row>
                        <Row>
                            {this.renderEcgList()}
                        </Row>
                        </div>
                    </Col>
                    <Clearfix />
                    <Col className="middle_column" ref="bla">
                        <Row className='ecg_list_header'>
                            Результат расшифровки
                        </Row>
                        <Row>
                            {(this.props.ecg_store.items.get(this.state.pid) != undefined) ?
                                ((this.props.ecg_store.items.get(this.state.pid).is_annotated) ?
                                    this.props.ecg_store.items.get(this.state.pid).annotation.map( x =>
                                        {return x.split('/').slice(-1)[0]}).join(', ')
                                    :
                                    "Выберите значения из справочника и нажмите кнопку Сохранить")
                                :
                                null
                            }
                        </Row>
                        <Row className='list_header2'>
                            Просмотр ЭКГ
                            {(this.props.ecg_store.items.get(this.state.pid) != undefined) ?
                                " " + this.props.ecg_store.items.get(this.state.pid).timestamp
                                :
                                null}
                        </Row>
                        <Row className="show_leads">
                            <span>Показать отведения <a href="#" className="onleft" onClick={this.handleLayoutChange}>
                                {this.state.view_all_channels ? "по-одному" : "все"}
                            </a>
                            </span>
                        </Row>
                        
                        {(this.props.ecg_store.items.values().length == 0) ?
                            <Row><span className="empty">Список ЭКГ пуст</span></Row>
                            :
                            ((this.state.pid !== null) ?
                        <Row>{this.renderGridPlot()}</Row>
                                :
                                <Row>
                                    <span className="empty">Выберите ЭКГ из списка</span>
                                </Row>
                                
                            )
                        }
                        
                    </Col>
                    <Clearfix />
                    <Col className='border_left right_column'>
                        <Row className='list_header'>
                            Расшифровка ЭКГ
                        </Row>
                        <Row>
                            <span className='list_header subheader'><span>Популярное</span>
                            <a href="#" onClick={this.handleCollapseCommon}>
                                {this.state.show_common ? "свернуть" : "развернуть"}
                            </a>
                            </span>
                        </Row>
                        {this.state.show_common ?
                            <Row className='common_list'>
                                {this.props.ecg_store.common_annotations.values().map( item => 
                                    this.renderCommonDiagnose(item))}
                            </Row> : null
                        }
                        <Row>
                            <span className='list_header subheader2'><span>Справочник</span>
                            <a href="#" onClick={this.handleCollapseGroups}>
                                {this.state.collapse_groups ? "развернуть" : "свернуть"}
                            </a></span>
                        </Row>
                        <Row>
                            {this.renderSearch()}
                        </Row>   
                        <Row className={this.state.show_common ? 'overflow_small' : 'overflow_large'}>
                            {this.props.ecg_store.annotation_list.values().map(item => 
                                this.renderDiagnoseGroup(item.id, item.annotations))}
                        </Row>
                        <Row className="bottom">
                            <Button type="submit" 
                                    bsStyle="success" 
                                    className="submit"
                                    disabled={this.state.annotation.length == 0}
                                    onClick={this.handleSubmit}>Сохранить</Button>
                        </Row>
                    </Col>
                </Row>
                </Grid>
            </div>
            )
        }
    }
}
