import { observable, action } from 'mobx';

export class TabStore {
  @observable value: number = 0;

  @action setValue(value: number) {
    this.value = value;
  }
}

const tabStore = new TabStore();

export default tabStore;
