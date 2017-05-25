import React, {Component, PropTypes} from 'react';
import styles from './App.css';
import classNames from 'classnames/bind';
import '@/css/theme.css';
import autoBind from 'react-autobind';
import {Button, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import Checkbox from '$/Checkbox';
import Item from './Item';
import {generateActionCreator} from '@/common/actionCreatorGenerator';
import {generateConsts} from '@/common/constsGenerator';
const cx = classNames.bind(styles);
class App extends Component{
  static propTypes = {
    loginAlready: PropTypes.bool,
    routes: PropTypes.array
  }

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props){
    super(props);
    autoBind(this);
  }

  render(){
    const {loginAlready, routes} = this.props;
    if (!loginAlready && routes[1].path !== 'login'){
      this.context.router.push('/login');
      return null;
    }
    return this.props.children;
  }
}

const mapStateToProps = (state) => {
  return {
    loginAlready: state.loginAlready
  };
}

export default connect(mapStateToProps)(App);
