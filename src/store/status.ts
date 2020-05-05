import { observable, action } from 'mobx';
import Status from '../domain/status';

export type StatusStoreType = {
  status: Status;
  lastDelta: Status | null;
  setStatus: (status: Status) => void;
  addStatus: (delta: Status) => void;
};

class StatusStore {
  @observable status: Status = Status.initial;

  @observable lastDelta: Status | null = null;

  @action setStatus(status: Status): void {
    this.status = status;
  }

  @action addStatus(delta: Status): void {
    this.status = this.status.add(delta);
    this.lastDelta = delta;
  }
}

const statusStore = new StatusStore();

export default statusStore;
