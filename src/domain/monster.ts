import Status from './status';

export default class Monster {
  name: string;
  status: Status;

  constructor(name: string, status: Status) {
    this.name = name;
    this.status = status;
  }
}
