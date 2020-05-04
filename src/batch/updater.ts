import { ConfigStoreType } from '../store/config';
import github from '../domain/github/client';
import slack from '../domain/slack/client';
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
    this.updateSlack();
  }

  updateGitHub() {
    console.log('update github');
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

  updateSlack() {
    console.log('update slack');
    const token = this.configStore.slackToken;
    if (token == null) {
      return;
    }
    slack.getMyMessages(token).then(messages => {
      const statusDelta = productivity.convertSlackMessage(messages);
      this.statusStore.addStatus(statusDelta);
    });
  }
}
