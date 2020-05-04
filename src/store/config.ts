import { observable, action } from 'mobx';

export type ConfigStoreType = {
  test: string;
  changeTest: (newTest: string) => void;
};

class ConfigStore {
  @observable test = '';

  @action changeTest(newTest: string) {
    console.log('change');
    this.test = newTest;
  }
}

const store = new ConfigStore();

export default store;
