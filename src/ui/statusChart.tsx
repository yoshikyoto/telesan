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
    container: {
      position: 'relative',
      height: '100px',
    },
    status: {
      position: 'absolute',
      top: '0px',
      left: '0px',
    },
    chart: {
      position: 'absolute',
      top: '0px',
      left: '100px',
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
      <div className={this.props.classes.container}>
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
        <div className={this.props.classes.chart}>
          <RadarChart outerRadius={100} width={400} height={300} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={90} domain={[0, 300]} />
            <Radar
              name="あなたのモンスター"
              dataKey="you"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StatusChart);
