import { observable, action, computed } from 'mobx';
import storage from './localStorageWrapper';

export type ConfigStoreType = {
  updateIntervalMinute: number;
  githubToken: string | null;
  githubEndpoint: string | null;
  githubMessage: string;
  slackToken: string | null;
  slackMessage: string;
  isNetworkEnabled: boolean;
  name: string | null;
  team: string;

  setUpdateIntervalMinute: (updateIntervalMinute: number) => void;
  setGitHubToken: (token: string | null) => void;
  setGitHubEndpoint: (endpoint: string | null) => void;
  getGitHubEndpoint: string;
  setGitHubMessage: (message: string) => void;
  setSlackToken: (token: string | null) => void;
  setSlackMessage: (message: string) => void;
  setNetworkEnabled: (value: boolean) => void;
  setName: (name: string) => void;
  setTeam: (commaSeparatedNames: string) => void;
  teamWithNlSeparatedNames: string;
};

class ConfigStore {
  @observable updateIntervalMinute: number = storage.getUpdateIntervalMinute(
    10,
  );

  @observable githubToken: string | null = storage.getGitHubToken();

  @observable githubEndpoint: string | null = storage.getGitHubEndpoint();

  // Token と Endpoint のチェックをした時の結果メッセージ
  @observable githubMessage: string = '';

  @observable slackToken: string | null = storage.getSlackToken();

  // Token と のチェックをした時の結果メッセージ
  @observable slackMessage: string = '';

  @observable isNetworkEnabled: boolean = storage.getNetworkEnabled();

  @observable name: string | null = storage.getName();

  @observable team: string = storage.getTeam();

  @action setUpdateIntervalMinute(updateIntervalMinute: number): void {
    storage.setUpdateIntervalMinute(updateIntervalMinute);
    this.updateIntervalMinute = updateIntervalMinute;
  }

  @action setGitHubToken(token: string | null): void {
    console.log('save token: ' + token);
    storage.setGitHubToken(token);
    this.githubToken = token;
  }

  @action setGitHubEndpoint(endpoint: string | null): void {
    console.log('setGitHubEndpoint');
    storage.setGitHubEndpoint(endpoint);
    if (endpoint != null) {
      this.githubEndpoint = endpoint;
    }
  }

  // computed は property みたいに呼び出すことになるけど、
  // これだと名前がメソッドみたいになってしまっている
  @computed get getGitHubEndpoint(): string {
    if (this.githubEndpoint == null) {
      return 'https://api.github.com';
    }
    return this.githubEndpoint;
  }

  @action setGitHubMessage(message: string): void {
    this.githubMessage = message;
  }

  @action setSlackToken(token: string | null): void {
    storage.setSlackToken(token);
    this.slackToken = token;
  }

  @action setSlackMessage(message: string): void {
    this.slackMessage = message;
  }

  @action setNetworkEnabled(value: boolean): void {
    storage.setNetworkEnabled(value);
    this.isNetworkEnabled = value;
  }

  @action setName(name: string | null): void {
    storage.setName(name);
    this.slackToken = name;
  }

  @action setTeam(commaSeparatedNames: string): void {
    storage.setTeam(commaSeparatedNames);
    this.team = commaSeparatedNames;
  }

  @computed get teamWithNlSeparatedNames(): string {
    return this.team.replace(',', '\n');
  }
}

const store = new ConfigStore();

export default store;
