import React from 'react';
import classNames from 'classnames/bind';
import styles from './LoginPage.css';
import autoBind from 'react-autobind';
import video from '@/videos/file.mp4';

const cx = classNames.bind(styles);
export default () => (
  <div classNames={cx({loginPage: true})}>
    <video
      loop
      autoPlay
      src={video}
    />
    <div className={cx({loginContainer: true})}>test aaaeeeeeeeeaa sss</div>
  </div>
)
