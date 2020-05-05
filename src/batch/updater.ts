import { ConfigStoreType } from '../store/config';
import github from '../domain/github/client';
import slack from '../domain/slack/client';
import productivity from '../domain/productivity';
import { StatusStoreType } from '../store/status';
import Status from '../domain/status';

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

  async update() {
    console.log('update');
    var statusDelta = Status.blank;

    // GitHub
    if (this.configStore.githubToken) {
      const statusByGitHub = await this.updateGitHub(
        this.configStore.githubToken,
      );
      if (statusByGitHub) {
        statusDelta = statusDelta.add(statusByGitHub);
      }
    }

    // Slack
    if (this.configStore.slackToken) {
      const statusBySlack = await this.updateSlack(this.configStore.slackToken);
      if (statusBySlack) {
        statusDelta = statusDelta.add(statusBySlack);
      }
    }

    this.statusStore.addStatus(statusDelta);
  }

  updateGitHub(token: string) {
    console.log('update github');
    const endpoint = this.configStore.getGitHubEndpoint;
    return new Promise((resolve: (statusDelta: Status) => void, reject) => {
      github
        .getEvents(endpoint, token)
        .then(githubEvents => {
          const statusDelta = productivity.convertGitHubEvents(githubEvents);
          resolve(statusDelta);
        })
        .catch(error => reject(error));
    });
  }

  updateSlack(token: string) {
    console.log('update slack');
    return new Promise((resolve: (statusDelta: Status) => void, reject) => {
      slack
        .getMyMessages(token)
        .then(messages => {
          const statusDelta = productivity.convertSlackMessage(messages);
          resolve(statusDelta);
        })
        .catch(error => reject(error));
    });
  }
}
