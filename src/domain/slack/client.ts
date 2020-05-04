import axios from 'axios';

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
