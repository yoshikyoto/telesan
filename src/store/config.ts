import { observable, action, computed } from 'mobx';
import storage from './localStorageWrapper';

export type ConfigStoreType = {
  updateIntervalMinute: number;
  githubToken: string | null;
  githubEndpoint: string | null;
  setUpdateIntervalMinute: (updateIntervalMinute: number) => void;
  setGitHubToken: (token: string | null) => void;
  setGitHubEndpoint: (endpoint: string | null) => void;
  getGitHubEndpoint: string;
};

class ConfigStore {
  @observable updateIntervalMinute: number = storage.getUpdateIntervalMinute(
    10,
  );

  @observable githubToken: string | null = storage.getGitHubToken();

  @observable githubEndpoint: string | null = storage.getGitHubEndpoint();

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
    storage.setGitHubEndpoint(endpoint);
    if (endpoint) this.githubToken = endpoint;
  }

  // computed は property みたいに呼び出すことになるけど、
  // これだと名前がメソッドみたいになってしまっている
  @computed get getGitHubEndpoint(): string {
    if (this.githubEndpoint == null) {
      return 'https://api.github.com';
    }
    return this.githubEndpoint;
  }
}

const store = new ConfigStore();

export default store;
