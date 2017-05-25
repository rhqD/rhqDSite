import React, {Component} from 'react';
import styles from './Item.css';
import classNames from 'classnames/bind';
import '@/css/theme.css';
import autoBind from 'react-autobind';
import Checkbox from '$/Checkbox';
import {Button} from 'react-bootstrap';

const cx = classNames.bind(styles);
class Item extends Component{
  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      renderRequest: false,
      renderSuccess: true,
      renderFailure: false,
      returnPromise: true,
      dispatchApiError: true,
      actionName: '',
      params: ''
    }
  }

  get renderRequest(){
    return this.state.renderRequest;
  }

  get renderSuccess(){
    return this.state.renderSuccess;
  }

  get renderFailure(){
    return this.state.renderFailure;
  }

  get returnPromise(){
    return this.state.returnPromise;
  }

  get actionName(){
    return this.state.actionName;
  }

  get params(){
    return this.state.params;
  }

  get dispatchApiError(){
    return this.state.dispatchApiError;
  }

  handleDelete(){
    this.props.onDelete(this.props.id);
  }

  render(){
    return (
      <div className={cx({item: true})}>
        <div className={cx({itemContent: true})}>
          <Checkbox
            className={cx({renderCheck: true})}
            checked={this.state.renderRequest}
            onChange={(e) => {
              this.setState({renderRequest: e.target.checked});
            }}
            label="render Request"
          />
          <Checkbox
            className={cx({renderCheck: true})}
            checked={this.state.renderSuccess}
            onChange={(e) => {
              this.setState({renderSuccess: e.target.checked});
            }}
            label="render Success"
          />
          <Checkbox
            className={cx({renderCheck: true})}
            checked={this.state.renderFailure}
            onChange={(e) => {
              this.setState({renderFailure: e.target.checked});
            }}
            label="render Failure"
          />
          <input
            type="text"
            placeholder="actionName"
            className={cx({actionNameInput: true})}
            value={this.state.actionName}
            onChange={(e) => {
              this.setState({actionName: e.target.value});
            }}
          />
          <input
            type="text"
            placeholder="参数"
            className={cx({paramsInput: true})}
            value={this.state.params}
            onChange={(e) => {
              this.setState({params: e.target.value});
            }}
          />
          <Checkbox
            className={cx({renderCheck: true})}
            checked={this.state.returnPromise}
            onChange={(e) => {
              this.setState({returnPromise: e.target.checked});
            }}
            label="return Promise"
          />
          <Checkbox
            className={cx({renderCheck: true})}
            checked={this.state.dispatchApiError}
            onChange={(e) => {
              this.setState({dispatchApiError: e.target.checked});
            }}
            label="dispatchApiError"
          />
        </div>
        <Button
          className="commonButton"
          onClick={this.handleDelete}
          style={{margin: '0 10px', width: 80, height: 34}}
          bsStyle="danger"
        >
          X
        </Button>
      </div>
    );
  }
}

export default Item;
