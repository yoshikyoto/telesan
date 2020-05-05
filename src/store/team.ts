import Monster from '../domain/monster';
import { action, observable } from 'mobx';

export type TeamStoreType = {
  monsters: Monster[];
};

class TeamStore {
  @observable monsters: Monster[] = [];

  @action setMonsters(monsters: Monster[]): void {
    this.monsters = monsters;
  }
}

const store = new TeamStore();

export default store;
