import { Octokit } from '@octokit/rest';

export class User {
  loginName: string;

  avatarUrl: string;

  constructor(loginName: string, avatarUrl: string) {
    this.loginName = loginName;
    this.avatarUrl = avatarUrl;
  }
}

export class GitHubEvent {}

/** コミットをpushしたイベント */
export class GitHubPushEvent extends GitHubEvent {}

/** ブランチやリポジトリを作成したイベント（だと思う） */
export class GitHubCreateEvent extends GitHubEvent {}

/** プルリクエストを作成したイベント */
export class GitHubPullRequestEvent extends GitHubEvent {}

/** プルリクエストにコメントしたイベント */
export class GitHubPullRequestReviewCommentEvent extends GitHubEvent {}

class Type {
  /** 何かを push した */
  static readonly PUSH = 'PushEvent';

  /** ブランチやリポジトリを作成した（だと思う） */
  static readonly CREATE = 'CreateEvent';

  /** プルリクエストを作成した */
  static readonly PULL_REQUEST = 'PullRequestEvent';

  static readonly PULL_REQUEST_REVIEW_COMMENT = 'PullRequestReviewCommentEvent';
}

class Client {
  async getEvents(endpoint: string, token: string) {
    const octokit = new Octokit({
      auth: token,
      baseUrl: endpoint,
    });
    return new Promise((resolve: (events: GitHubEvent[]) => void, reject) => {
      this.getAuthenticated(endpoint, token).then((user: User) => {
        octokit.activity
          .listEventsForAuthenticatedUser({
            username: user.loginName,
            per_page: 100,
          })
          .then(result => {
            const events: GitHubEvent[] = [];
            for (const event of result.data) {
              switch (event.type) {
                case Type.CREATE:
                  events.push(new GitHubCreateEvent());
                  break;
                case Type.PUSH:
                  events.push(new GitHubPushEvent());
                  break;
                case Type.PULL_REQUEST:
                  events.push(new GitHubPullRequestEvent());
                  break;
                case Type.PULL_REQUEST_REVIEW_COMMENT:
                  events.push(new GitHubPullRequestReviewCommentEvent());
                  break;
              }
            }
            resolve(events);
          })
          .catch(e => reject(e));
      });
    });
  }

  async getAuthenticated(endpoint: string, token: string) {
    console.log(endpoint);
    console.log(token);
    const octokit = new Octokit({
      auth: token,
      baseUrl: endpoint,
    });
    return new Promise((resolve: (user: User) => void, reject) => {
      octokit.users.getAuthenticated().then(
        response => {
          console.log('成功');
          const user = new User(response.data.login, response.data.avatar_url);
          resolve(user);
        },
        error => {
          console.log('エラー');
          reject(error);
        },
      );
    });
  }
}

const client = new Client();

export default client;
