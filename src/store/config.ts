import { observable, action, computed } from 'mobx';
import storage from './localStorageWrapper';

export type ConfigStoreType = {
  updateIntervalMinute: number;
  githubToken: string | null;
  githubEndpoint: string | null;
  githubMessage: string;
  setUpdateIntervalMinute: (updateIntervalMinute: number) => void;
  setGitHubToken: (token: string | null) => void;
  setGitHubEndpoint: (endpoint: string | null) => void;
  getGitHubEndpoint: string;
  setGitHubMessage: (message: string) => void;
};

class ConfigStore {
  @observable updateIntervalMinute: number = storage.getUpdateIntervalMinute(
    10,
  );

  @observable githubToken: string | null = storage.getGitHubToken();

  @observable githubEndpoint: string | null = storage.getGitHubEndpoint();

  // Token と Endpoint のチェックをした時の結果メッセージ
  @observable githubMessage: string = '';

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
}

const store = new ConfigStore();

export default store;
