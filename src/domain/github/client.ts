import { Octokit } from '@octokit/rest';

export class User {
  loginName: string;

  avatarUrl: string;

  constructor(loginName: string, avatarUrl: string) {
    this.loginName = loginName;
    this.avatarUrl = avatarUrl;
  }
}

class Client {
  getActivity() {
    console.log('get acatigity');
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
