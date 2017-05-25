import React, {Component} from 'react';
import {Link} from 'react-router';

class Page1 extends Component{
  render(){
    return (
      <div>
        {'this is page1'}
        <hr />
        <ul>
          <li>
            <Link to="/page1/subpage1">{'SubPage1 '}</Link>
          </li>
          <li>
            <Link to="/page1/subpage2">{'SubPage2'}</Link>
          </li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

export default Page1;
