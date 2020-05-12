import { observable, action } from 'mobx';
import { number } from 'prop-types';

export type TabStoreType = {
  value: number;
};

class TabStore {
  @observable value: number = 0;

  @action setValue(value: number) {
    this.value = value;
  }
}

const tabStore = new TabStore();

export default tabStore;
