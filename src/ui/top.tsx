import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Top extends Component {
  render() {
    return (
      <div>
        <h1>あなたのモンスター</h1>
        <Link to="/config">設定</Link>
      </div>
    );
  }
}

export default Top;
