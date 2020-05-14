import React, { Component } from 'react';
import Status from '../domain/status';
import { withStyles, WithStyles } from '@material-ui/styles';
import { createStyles } from '@material-ui/core';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts';

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
    const data = [
      {
        subject: 'たいりょく',
        you: status.health,
        fullMark: 300,
      },
      {
        subject: 'こうげき',
        you: status.attack,
        fullMark: 300,
      },
      {
        subject: 'ぼうぎょ',
        you: status.defence,
        fullMark: 300,
      },
    ];

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
        <RadarChart outerRadius={150} width={500} height={500} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={90} domain={[0, 300]} />
          <Radar
            name="あなたのモンスター"
            dataKey="You"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </div>
    );
  }
}

export default withStyles(styles)(StatusChart);
