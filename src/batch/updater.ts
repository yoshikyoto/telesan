import { ConfigStoreType } from '../store/config';
import github from '../domain/github/client';

export default class Updater {
  store: ConfigStoreType;

  constructor(store: ConfigStoreType) {
    this.store = store;
  }

  start() {
    setInterval(() => {
      this.update();
    }, this.store.updateIntervalMinute * 1000 * 60);
  }

  update() {
    github.getActivity();
  }
}
