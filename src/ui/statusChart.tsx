import React, { Component } from 'react';
import Status from '../domain/status';
import { withStyles, WithStyles } from '@material-ui/styles';
import { createStyles } from '@material-ui/core';

const styles = () =>
  createStyles({
    status: {
      fontWeight: 'bold',
    },
  });

interface Props extends WithStyles<typeof styles> {
  status: Status;
  lastDelta: Status;
}

class StatusChart extends Component<Props> {
  render() {
    const status = this.props.status;
    const lastDelta = this.props.lastDelta;
    return (
      <div className={this.props.classes.status}>
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

export default withStyles(styles)(StatusChart);
