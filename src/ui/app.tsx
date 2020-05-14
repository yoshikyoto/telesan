import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import Top from './top';
import Config from './config';
import Team from './team';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import tabStore, { TabStore } from '../store/tab';

type Props = {
  tabStore?: TabStore;
};

@inject('tabStore')
@observer
class App extends Component<Props> {
  render() {
    const { tabStore } = this.props;
    const tabValue = tabStore ? tabStore.value : 0;
    return (
      <>
        <Tabs
          value={tabValue}
          onChange={(e, v) => this.changeTab(e, v)}
          centered>
          <Tab label="あなたのモンスター" />
          <Tab label="チームを見る" />
          <Tab label="設定" />
        </Tabs>
        {tabValue === 0 && <Top />}
        {tabValue === 1 && <Team />}
        {tabValue === 2 && <Config />}
      </>
    );
  }

  changeTab(event: React.ChangeEvent<{}>, newValue: number) {
    console.log(newValue);
    const { tabStore } = this.props;
    if (tabStore == null) {
      return;
    }
    tabStore.setValue(newValue);
  }
}

class AppWithStore extends Component {
  render() {
    return (
      <Provider tabStore={tabStore}>
        <App />
      </Provider>
    );
  }
}

export default AppWithStore;
