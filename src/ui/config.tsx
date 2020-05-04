import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Config extends Component {
  render() {
    return (
      <div>
        <h1>設定</h1>
        <Link to="/">閉じる</Link>
      </div>
    );
  }
}

export default Config;
