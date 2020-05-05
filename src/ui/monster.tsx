import React, { Component } from 'react';
import Status from '../domain/status';
import { observer } from 'mobx-react';

type Props = {
  status: Status;
};

@observer
class Monster extends Component<Props> {
  static readonly EVOLUTION = 200;

  getMonsterImage(status: Status): string {
    if (
      status.health >= Monster.EVOLUTION &&
      status.attack >= Monster.EVOLUTION &&
      status.defence >= Monster.EVOLUTION
    ) {
      return 'https://telesan.herokuapp.com/images/all.png';
    }
    if (status.health >= Monster.EVOLUTION) {
      return 'https://telesan.herokuapp.com/images/health.png';
    }
    if (status.attack >= Monster.EVOLUTION) {
      return 'https://telesan.herokuapp.com/images/attack.png';
    }
    if (status.defence >= Monster.EVOLUTION) {
      return 'https://telesan.herokuapp.com/images/defence.png';
    }
    return 'https://telesan.herokuapp.com/images/normal.png';
  }

  render() {
    const monsterImage = this.getMonsterImage(this.props.status);
    return <img src={monsterImage} />;
  }
}

export default Monster;
