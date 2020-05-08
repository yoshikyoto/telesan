import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import configStore, { ConfigStoreType } from '../store/config';
import activeWindowStore, {
  ActiveWindowStoreType,
} from '../store/activeWindow';
import github, { User } from '../domain/github/client';
import slack from '../domain/slack/client';

type Props = {
  store?: ConfigStoreType;
  activeWindowStore?: ActiveWindowStoreType;
};

@inject('store', 'activeWindowStore')
@observer
class Config extends Component<Props> {
  getActiveWindows(): { [s: string]: number } {
    if (this.props.activeWindowStore) {
      return this.props.activeWindowStore.total;
    } else {
      return {};
    }
  }

  render() {
    const { store } = this.props;
    const activeWindows = this.getActiveWindows();
    return (
      <div>
        <h1>設定</h1>
        <div>
          ステータスを他の人に公開する:
          <input
            type="checkbox"
            onChange={e => this.toggleNetwork(e)}
            defaultChecked={store ? store.isNetworkEnabled : false}
          />
        </div>
        <div>
          ID:
          <input
            type="text"
            placeholder="例: utakata@dwango"
            defaultValue={store && store.name ? store.name : ''}
            onChange={e => this.changeName(e)}
            disabled={store ? !store.isNetworkEnabled : true}
          />
          <br />
          （一意な名前にする必要があります。）
        </div>
        {/*
        <div>
          GitHub endpoint:
          <input
            type="text"
            defaultValue={
              store && store.githubEndpoint ? store.githubEndpoint : ''
            }
            onChange={e => this.changeGitHubEndpoint(e)}
          />
        </div>
        <div>
          GitHub token:
          <input
            type="text"
            defaultValue={store && store.githubToken ? store.githubToken : ''}
            onChange={e => this.changeGitHubToken(e)}
          />
          <button onClick={() => this.checkGitHub()}>接続テスト</button>
        </div>
        <div>{store ? store.githubMessage : ''}</div>
        <div>
          Slack token:
          <input
            type="text"
            defaultValue={store && store.slackToken ? store.slackToken : ''}
            onChange={e => this.changeSlackToken(e)}
          />
          <button onClick={() => this.checkSlack()}>接続テスト</button>
          <div>{store ? store.slackMessage : ''}</div>
        </div>
        */}
        <div>チームのみんな</div>
        <div>
          <textarea
            defaultValue={store ? store.teamWithNlSeparatedNames : ''}
            onChange={e => this.changeTeam(e)}
          />
        </div>
        <div>最近のアクティブウィンドウ</div>
        <div>
          {Object.keys(activeWindows).map(activeWindowName => (
            <div key={activeWindowName}>
              {activeWindows[activeWindowName]} {activeWindowName}
            </div>
          ))}
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

  checkGitHub() {
    if (!this.props.store) {
      return;
    }
    const store = this.props.store;
    const token = store.githubToken;
    if (token == null) {
      store.setGitHubMessage('tokenが設定されていません');
      return;
    }
    const endpoint = this.props.store.getGitHubEndpoint;
    store.setGitHubMessage('GitHubに接続中...');
    github
      .getAuthenticated(endpoint, token)
      .then((user: User) => {
        console.log('成功');
        const message = '接続に成功！ loginName: ' + user.loginName;
        store.setGitHubMessage(message);
      })
      .catch(() => {
        store.setGitHubMessage('接続に失敗しました');
      });
  }

  changeSlackToken(event: React.ChangeEvent<HTMLInputElement>) {
    // https://api.slack.com/legacy/custom-integrations/legacy-tokens
    if (!this.props.store) {
      return;
    }
    this.props.store.setSlackToken(event.target.value);
  }

  checkSlack() {
    if (!this.props.store) {
      return;
    }
    const store = this.props.store;
    const token = store.slackToken;
    if (token == null) {
      store.setSlackMessage('tokenが設定されていません');
      return;
    }
    slack.getMyMessages(token).then(messages => {
      console.log(messages);
      store.setSlackMessage('接続成功');
    });
  }

  toggleNetwork(event: React.ChangeEvent<HTMLInputElement>) {
    if (!this.props.store) {
      return;
    }
    const store = this.props.store;
    store.setNetworkEnabled(event.target.checked);
  }

  changeName(event: React.ChangeEvent<HTMLInputElement>) {
    if (!this.props.store) {
      return;
    }
    const store = this.props.store;
    store.setName(event.target.value);
  }

  changeTeam(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!this.props.store) {
      return;
    }
    const store = this.props.store;
    store.setTeam(event.target.value.trim().replace(/\n/g, ','));
  }
}

class ConfigWithProps extends Component {
  render() {
    return (
      <Provider store={configStore} activeWindowStore={activeWindowStore}>
        <Config />
      </Provider>
    );
  }
}

export default ConfigWithProps;
