import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Link, HashRouter } from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import Top from './top';
import Config from './config';
import Team from './team';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import tabStore, { TabStoreType } from '../store/tab';

type Props = {
  tabStore?: TabStoreType;
};

@inject('tabStore')
@observer
class App extends Component<Props> {
  render() {
    // Electron では BrowserRouter ではなく HashRouter を使う
    const { tabStore } = this.props;
    const tabValue = tabStore ? tabStore.value : 0;
    return (
      <HashRouter>
        <Tabs value={tabValue} centered>
          <Tab label="あなたのモンスター" to="/" component={Link} />
          <Tab label="チームを見る" to="/team" component={Link} />
          <Tab label="設定" to="/config" component={Link} />
        </Tabs>
        <Switch>
          <Route path="/config" component={Config} />
          <Route path="/team" component={Team} />
          <Route path="/" component={Top} />
        </Switch>
      </HashRouter>
    );
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
