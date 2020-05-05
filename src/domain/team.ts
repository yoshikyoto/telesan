import configStorage, { ConfigStoreType } from '../store/config';
import telesanClient, { TelesanClient } from './telesanNet/client';
import teamStore from '../store/team';
import Monster from './monster';

class Team {
  configStorage: ConfigStoreType;

  telesanClient: TelesanClient;

  constructor(configStorage: ConfigStoreType, telesanClient: TelesanClient) {
    this.configStorage = configStorage;
    this.telesanClient = telesanClient;
  }

  update() {
    telesanClient
      .getMonsters(this.configStorage.team)
      .then((monsters: Monster[]) => {
        console.log('setmonsters');
        teamStore.setMonsters(monsters);
      });
  }
}

const team = new Team(configStorage, telesanClient);

export default team;
