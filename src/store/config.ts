import { observable, action } from 'mobx';

export type ConfigStoreType = {
  test: string;
  changeTest: (newTest: number) => void;
};

class ConfigStore {
  @observable test: number = 10;

  @action changeTest(newTest: number) {
    this.test = newTest;
  }
}

const store = new ConfigStore();

export default store;
