import React from 'react';
import {Link} from 'react-router';

export default () => (
  <div>
    {'this is page2.'}
    <br />
    <Link to="/">{'return to home'}</Link>
  </div>
)
