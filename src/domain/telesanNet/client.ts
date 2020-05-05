import Status from '../status';
import axios from 'axios';
import Monster from '../monster';

export class TelesanClient {
  static readonly BASE = 'https://telesan.herokuapp.com';

  async postMonster(name: string, status: Status) {
    console.log('post to telesan-net');
    axios.post(TelesanClient.BASE + '/monster', {
      name: name,
      health: status.health,
      attack: status.attack,
      defence: status.defence,
    });
  }

  getMonsters(names: string) {
    console.log('getmonsters');
    return new Promise((resolve: (monsters: Monster[]) => void, reject) => {
      axios
        .get(TelesanClient.BASE + '/monsters', {
          params: {
            names: names,
          },
        })
        .then(result => {
          const monsters: Monster[] = [];
          console.log(result.data);
          for (const item of result.data) {
            console.log(item);
            monsters.push(
              new Monster(
                item.name,
                new Status(item.health, item.attack, item.defence),
              ),
            );
          }
          resolve(monsters);
        })
        .catch(error => reject(error));
    });
  }
}

const client = new TelesanClient();

export default client;
