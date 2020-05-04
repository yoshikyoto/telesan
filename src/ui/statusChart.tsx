import React, { Component } from 'react';
import Status from '../domain/status';

type Props = {
  status: Status;
  lastDelta: Status;
};

class StatusChart extends Component<Props> {
  render() {
    const status = this.props.status;
    const lastDelta = this.props.lastDelta;
    return (
      <div>
        <div>
          たいりょく: {status.health}（+{lastDelta.health}）
        </div>
        <div>
          こうげき: {status.attack}（+{lastDelta.attack}）
        </div>
        <div>
          ぼうぎょ: {status.defence}（+{lastDelta.defence}）
        </div>
      </div>
    );
  }
}

export default StatusChart;
