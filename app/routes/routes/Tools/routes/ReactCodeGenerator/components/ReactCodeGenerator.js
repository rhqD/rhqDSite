import React, {Component} from 'react';
import styles from './ReactCodeGenerator.css';
import classNames from 'classnames/bind';
import autoBind from 'react-autobind';
import {Button, FormControl} from 'react-bootstrap';
import _ from 'lodash';
import Checkbox from '$/Checkbox';
import Item from './Item';
import {generateActionCreator} from '@/common/actionCreatorGenerator';
import {generateConsts} from '@/common/constsGenerator';
const cx = classNames.bind(styles);
class ReactCodeGenerator extends Component{
  constructor(props){
    super(props);
    autoBind(this);
    this.generatedId = 0;
    this.state = {
      items: [],
      actionNamePrefix: '',
      serverEndPoint: '',
      consts: '',
      actionCreators: ''
    }
  }

  handleAddItem(){
    const {items} = this.state;
    items.push(this.generatedId++);
    this.setState({items: items});
  }

  handleDelete(id){
    const {items} = this.state;
    const newItems = _.filter(items, (item) => (item !== id));
    this.setState({items: newItems});
  }

  get actionNamePrefix(){
    return this.state.actionNamePrefix;
  }

  get serverEndPoint(){
    return this.state.serverEndPoint;
  }

  handleOk(){
    const items = this.items.map((item) => {
      return {
        renderRequest: item.renderRequest,
        renderSuccess: item.renderSuccess,
        renderFailure: item.renderFailure,
        returnPromise: item.returnPromise,
        dispatchApiError: item.dispatchApiError,
        actionName: item.actionName,
        params: item.params,
        actionNamePrefix: this.actionNamePrefix,
        serverEndPoint: this.serverEndPoint
      };
    });
    const consts = items.map((item) => (item === null ? '' : generateConsts(item))).join('\n\n');
    const actionCreators = items.map((item) => (item === null ? '' : generateActionCreator(item))).join('\n');
    this.setState({consts, actionCreators});
  }

  renderItem(item, isHighlighted){
  return (<div
    key={item}
    className={cx({menuItem: true, highlightedItem: isHighlighted})}
  >
    {item}
  </div>);
}

  render(){
    this.items = [];
    return (
      <div className={cx({app: true})}>
        <div className={`${cx({header: true})} 3DBox`}>
          <FormControl
            className={cx({input: true})}
            type="text"
            value={this.state.actionNamePrefix}
            placeholder="actionNamePrefix"
            onChange={(e) => {
              this.setState({actionNamePrefix: e.target.value});
            }}
          />
          <FormControl
            className={cx({input: true})}
            type="text"
            value={this.state.serverEndPoint}
            placeholder="serverEndPoint"
            onChange={(e) => {
              this.setState({serverEndPoint: e.target.value});
            }}
          />
          <Button
            className="commonButton"
            onClick={this.handleAddItem}
            style={{margin: '0 10px'}}
            bsStyle="info"
          >
            添加
          </Button>
          <Button
            className="commonButton"
            onClick={this.handleOk}
            bsStyle="info"
          >
            走你
          </Button>
        </div>
        <div className={cx({content: true})}>
          <div className={cx({itemsContainer: true})}>
            {this.state.items.map((id, index) => {
              return (<Item
                key={`item${id}`}
                id={id}
                onDelete={this.handleDelete}
                ref={(c) => {
                  this.items[index] = c;
                }}
              />);
            })}
          </div>
          <div className={cx({resultContainer: true})}>
            <textarea
              className={cx({resultItem: true})}
              value={this.state.consts}
            />
            <textarea
              className={cx({resultItem: true})}
              value={this.state.actionCreators}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ReactCodeGenerator;
