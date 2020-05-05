import axios from 'axios';
import { Provider } from 'mobx-react';
import displayName = Provider.displayName;

export class SlackUser {
  displayName: string;
  teamId: string;

  constructor(diplayName: string, teamId: string) {
    this.displayName = displayName;
    this.teamId = teamId;
  }
}

export class SlackMessage {
  id: string;
  userName: string;
  text: string;

  constructor(id: string, userName: string, text: string) {
    this.id = id;
    this.userName = userName;
    this.text = text;
  }
}

class SlackClient {
  async getMe(token: string) {
    const uri = 'https://slack.com/api/users.profile.get';
    return new Promise((resolve: (user: SlackUser) => void, reject) => {
      axios
        .get(uri, {
          params: {
            token: token,
          },
        })
        .then(result => {
          console.log(result.data);
          resolve(new SlackUser(result.data.user.name, result.data.user.id));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  async getMyMessages(token: string) {
    const uri = 'https://slack.com/api/search.messages';
    return new Promise(
      (resolve: (messages: SlackMessage[]) => void, reject) => {
        axios
          .get(uri, {
            params: {
              token: token,
              query: 'from:me',
              count: 100,
              sort: 'timestamp',
              sort_dir: 'desc',
            },
          })
          .then(result => {
            const messages: SlackMessage[] = [];
            for (const item of result.data.messages.matches) {
              messages.push(
                new SlackMessage(item.iid, item.username, item.text),
              );
              resolve(messages);
            }
          })
          .catch(error => {
            reject(error);
          });
      },
    );
  }
}

const slackClient = new SlackClient();

export default slackClient;
