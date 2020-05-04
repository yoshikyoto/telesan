import Status from './status';
import { GitHubEvent } from './github/client';
import { SlackMessage } from './slack/client';

export class Productivity {
  convertGitHubEvents(events: GitHubEvent[]) {
    // とりあえず単純にイベントの数で変換する
    const count = events.length;
    return new Status(0, count, 0);
  }

  convertSlackMessage(messages: SlackMessage[]) {
    const count = messages.length;
    return new Status(count, 0, 0);
  }
}

const productivity = new Productivity();

export default productivity;
