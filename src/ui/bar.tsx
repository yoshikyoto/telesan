import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Bar extends Component {
  render() {
    return (
      <AppBar>
        <Tabs value={0}>
          <Tab label="あなたのモンスター" />
          <Tab label="チームを見る" />
          <Tab label="設定" />
        </Tabs>
      </AppBar>
    );
  }
}

export default Bar;
