import { observable, action, computed } from 'mobx';
import { number } from 'prop-types';
import Status from '../domain/status';

export type ActiveWindowStoreType = {
  // アプリが起動してからの統計
  total: { [s: string]: number };

  codingPointInInterval: number;
  meetingPointInInterval: number;
  communicationPointInInterval: number;
  countInInterval: number;
  statusDelta: Status;

  addActionWindow: (name: string, title: string, value: number) => void;
};

class ActiveWindowStore {
  @observable total: { [s: string]: number } = {};

  codingPointInInterval: number = 0;
  meetingPointInInterval: number = 0;
  communicationPointInInterval: number = 0;
  countInInterval: number = 0;

  @action addActiveWindow(name: string, title: string, value: number) {
    const key = 'name:' + name + '\ttitle:' + title;
    if (this.total[key]) {
      this.total[key] += value;
    } else {
      this.total[key] = value;
    }
  }

  @action addPointsInInterval(
    coding: number,
    meeting: number,
    communication: number,
  ) {
    this.codingPointInInterval += coding;
    this.meetingPointInInterval += meeting;
    this.communicationPointInInterval += communication;
    this.countInInterval++;
    console.log({
      coding: this.codingPointInInterval,
      meeting: this.meetingPointInInterval,
      communication: this.communicationPointInInterval,
    });
  }

  @action startNextInterval(): void {
    this.codingPointInInterval = 0;
    this.communicationPointInInterval = 0;
    this.meetingPointInInterval = 0;
    this.countInInterval = 0;
  }

  @computed get statusDelta(): Status {
    const multiple = 5;
    if (
      this.communicationPointInInterval > this.codingPointInInterval &&
      this.communicationPointInInterval > this.meetingPointInInterval
    ) {
      return new Status(this.communicationPointInInterval + multiple, 0, 0);
    }

    if (
      this.meetingPointInInterval > this.codingPointInInterval &&
      this.meetingPointInInterval > this.communicationPointInInterval
    ) {
      return new Status(0, 0, this.meetingPointInInterval + multiple);
    }

    if (
      this.codingPointInInterval > this.meetingPointInInterval &&
      this.codingPointInInterval > this.communicationPointInInterval
    ) {
      return new Status(0, this.codingPointInInterval + multiple, 0);
    }

    return Status.blank;
  }
}

const store = new ActiveWindowStore();

export default store;
