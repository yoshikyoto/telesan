import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Top from './top';
import Config from './config';

class App extends Component {
  render() {
    return (
      // Electron では BrowserRouter ではなく HashRouter を使う
      <HashRouter>
        <Switch>
          <Route path="/config" component={Config} />
          <Route path="/" component={Top} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
