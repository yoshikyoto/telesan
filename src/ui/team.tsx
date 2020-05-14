import React, { Component } from 'react';
import teamUpdater from '../domain/team';
import { observer, inject, Provider } from 'mobx-react';
import statusStore, { StatusStoreType } from '../store/status';
import teamStore, { TeamStoreType } from '../store/team';
import Monster from './monster';
import StatusChart from './statusChart';
import Status from '../domain/status';

type Props = {
  statusStore?: StatusStoreType;
  teamStore?: TeamStoreType;
};

@inject('statusStore', 'teamStore')
@observer
class Team extends Component<Props> {
  componentDidMount(): void {
    teamUpdater.update();
  }

  render() {
    if (!this.props.statusStore || !this.props.teamStore) {
      return <div>読み込みに失敗しました</div>;
    }
    const statusStore = this.props.statusStore;
    const teamMonsters = this.props.teamStore.monsters;
    console.log(teamMonsters);
    const myStatus = statusStore.status;
    const myStatusDelta = statusStore.lastDelta
      ? statusStore.lastDelta
      : Status.blank;
    return (
      <div>
        <div>
          <h2>あなた</h2>
          <StatusChart status={myStatus} lastDelta={myStatusDelta} />
          <Monster status={myStatus} />
        </div>
        {teamMonsters.map(monster => {
          return (
            <div key={monster.name}>
              <h2>{monster.name}</h2>
              <StatusChart status={monster.status} lastDelta={Status.blank} />
              <Monster status={monster.status} />
            </div>
          );
        })}
      </div>
    );
  }
}

class TeamWithProps extends Component {
  render() {
    return (
      <Provider statusStore={statusStore} teamStore={teamStore}>
        <Team />
      </Provider>
    );
  }
}

export default TeamWithProps;
