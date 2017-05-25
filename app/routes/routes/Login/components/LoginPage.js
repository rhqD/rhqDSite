import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from './LoginPage.css';
import autoBind from 'react-autobind';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actionCreators from '../actions';
import video from '@/videos/file.mp4';

const cx = classNames.bind(styles);
export class LoginPage extends Component{
  static propTypes = {
    login: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      userName: '',
      password: ''
    }
  }

  handleLogin(){
    if (!_.isEmpty(this.state.userName) && !_.isEmpty(this.state.password)){
      this.props.login({userName: this.state.userName, password: this.state.password}).then(() => {
        this.context.router.push('/home');
      }).catch((error) => {
        alert('账号密码不匹配');
      })
    }
  }

  render(){
    return (<div className={cx({loginPage: true})}>
      <video
        loop
        autoPlay
        src={video}
      />
      <div className={cx({loginContainer: true})}>
        <div className={cx({loginForm: true})}>
          <FormGroup>
            <FormControl
              placeholder="User Name"
              type="text"
              className={cx({formCtl: true})}
              value={this.state.userName}
              onChange={(e) => {
                this.setState({userName: e.target.value});
              }}
            />
            <FormControl
              placeholder="Password"
              className={cx({formCtl: true})}
              value={this.state.password}
              type="password"
              onChange={(e) => {
                this.setState({password: e.target.value});
              }}
            />
          </FormGroup>
          <Button
            bsStyle="info"
            className={cx({loginButton: true})}
            onClick={this.handleLogin}
          >
            SIGN IN
          </Button>
        </div>
      </div>
    </div>);
  }
}

export default connect(undefined, actionCreators)(LoginPage);
