import { Octokit } from '@octokit/rest';

class Client {
  getActivity() {
    console.log('get acatigity');
  }

  getAuthenticated(endpoint: string, token: string) {
    console.log(endpoint);
    console.log(token);
    const octokit = new Octokit({
      auth: token,
      baseUrl: endpoint,
    });
    octokit.users.getAuthenticated();
  }
}

const client = new Client();

export default client;
