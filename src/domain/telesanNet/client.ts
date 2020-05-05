import Status from '../status';
import axios from 'axios';

class Client {
  static readonly BASE = 'https://telesan.herokuapp.com';

  async postMonster(name: string, status: Status) {
    console.log('post to telesan-net');
    axios.post(Client.BASE + '/monster', {
      name: name,
      health: status.health,
      attack: status.attack,
      defence: status.defence,
    });
  }
}

const client = new Client();

export default client;
