import Status from './status';
import { GitHubEvent } from './github/client';

export class Productivity {
  convertGitHubEvents(events: GitHubEvent[]) {
    // とりあえず単純にイベントの数で変換する
    const count = events.length;
    return new Status(0, count, 0);
  }
}

const productivity = new Productivity();

export default productivity;
