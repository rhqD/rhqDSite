import React, {Component, PropTypes} from 'react';
import styles from './Checkbox.css';
import checkedImg from '@/images/checkBoxChecked.png';
import unCheckedImg from '@/images/checkBoxUnChecked.png';
import autoBind from 'react-autobind';
import _ from 'lodash';
import classNames from 'classnames/bind';
import {isEqual} from '@/common/objectCompare';
const cx = classNames.bind(styles);

export default class Checkbox extends Component{
  static propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
    inputRef: PropTypes.func
  };

  constructor(props){
    super(props);
    autoBind(this);
    this.state = {checked: _.isBoolean(this.props.checked) ? this.props.checked : false};
  }

  componentWillReceiveProps(nextProps){
    if (_.isBoolean(nextProps.checked)){
      this.setState({checked: nextProps.checked});
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    const oldValue = _.isBoolean(this.props.checked) ? this.props.checked : this.state.checked;
    const newValue = _.isBoolean(nextProps.checked) ? nextProps.checked : nextState.checked;
    if (oldValue !== newValue){
      return true;
    }
    if (!isEqual(this.props, nextProps)){
      return true;
    }
    return false;
  }

  handleChange(e){
    this.setState({checked: e.target.checked});
    if (_.isFunction(this.props.onChange)){
      this.props.onChange(e);
    }
  }

  get checked(){
    return this.inputRef.checked;
  }

  get name(){
    return this.inputRef.name;
  }

  get value(){
    return this.inputRef.value;
  }

  render(){
    const {className, style, label, inputRef, ...others} = this.props;
    let checked = this.state.checked;
    if (_.isBoolean(this.props.checked)){
      checked = this.props.checked;
    }
    return (
      <div
        className={`${cx({container: true})} ${className}`}
        style={style}
      >
        <div className={cx({showDiv: true})}>
          <div className={cx({imgContainer: true})}>
            <img src={checked ? checkedImg : unCheckedImg} />
          </div>
          <label className={cx({label: true})}>
            {label}
          </label>
        </div>
        <input
          {...others}
          onChange={this.handleChange}
          className={cx({actualInput: true})}
          checked={checked}
          type="checkbox"
          ref={(c) => {
            if (_.isFunction(inputRef)){
              inputRef(c);
            }
            this.inputRef = c;
          }}
        />
      </div>
    );
  }

}
