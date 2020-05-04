import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import configStore, { ConfigStoreType } from '../store/config';
import github from '../domain/github/client';

type Props = {
  store?: ConfigStoreType;
};

@inject('store')
@observer
class Config extends Component<Props> {
  render() {
    const { store } = this.props;
    return (
      <div>
        <h1>設定</h1>
        <Link to="/">閉じる</Link>
        <div>
          ステータス更新間隔:
          <input type="text" onChange={e => this.changeUpdateInterval(e)} /> 分
        </div>
        <div>debug: {store ? store.updateIntervalMinute : ''}</div>
        <div>
          GitHub endpoint:
          <input
            type="text"
            value={store && store.githubEndpoint ? store.githubEndpoint : ''}
            onChange={e => this.changeGitHubEndpoint(e)}
          />
        </div>
        <div>
          GitHub token:
          <input
            type="text"
            value={store && store.githubToken ? store.githubToken : ''}
            onChange={e => this.changeGitHubToken(e)}
          />
          <button onClick={() => this.checkGitHubToken()}>接続テスト</button>
        </div>
      </div>
    );
  }

  changeUpdateInterval(event: React.ChangeEvent<HTMLInputElement>) {
    if (!this.props.store) {
      return;
    }
    const value = Number(event.target.value);
    if (isNaN(value)) {
      return;
    }
    if (value < 1) {
      return;
    }
    this.props.store.setUpdateIntervalMinute(value);
  }

  changeGitHubEndpoint(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('changeGitHubEndpoint');
    if (!this.props.store) {
      return;
    }
    this.props.store.setGitHubEndpoint(event.target.value);
  }

  changeGitHubToken(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('changeGitHubToken');
    if (!this.props.store) {
      return;
    }
    this.props.store.setGitHubToken(event.target.value);
  }

  checkGitHubToken() {
    if (!this.props.store) {
      return;
    }
    const token = this.props.store.githubToken;
    if (token == null) {
      return;
    }
    const endpoint = this.props.store.getGitHubEndpoint;
    github.getAuthenticated(endpoint, token);
  }
}

class ConfigWithProps extends Component {
  render() {
    return (
      <Provider store={configStore}>
        <Config />
      </Provider>
    );
  }
}

export default ConfigWithProps;
