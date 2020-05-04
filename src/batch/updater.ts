import { ConfigStoreType } from '../store/config';
import github from '../domain/github/client';
import productivity from '../domain/productivity';
import { StatusStoreType } from '../store/status';

export default class Updater {
  configStore: ConfigStoreType;
  statusStore: StatusStoreType;

  constructor(configStore: ConfigStoreType, statusStore: StatusStoreType) {
    this.configStore = configStore;
    this.statusStore = statusStore;
  }

  start() {
    setInterval(() => {
      this.update();
    }, this.configStore.updateIntervalMinute * 1000 * 10);
  }

  update() {
    console.log('update');
    this.updateGitHub();
  }

  updateGitHub() {
    const endpoint = this.configStore.getGitHubEndpoint;
    const token = this.configStore.githubToken;
    if (token == null) {
      return;
    }
    github.getEvents(endpoint, token).then(githubEvents => {
      const statusDelta = productivity.convertGitHubEvents(githubEvents);
      this.statusStore.addStatus(statusDelta);
    });
  }
}
