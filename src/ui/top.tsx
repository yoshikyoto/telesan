import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import statusStore, { StatusStoreType } from '../store/status';
import Status from '../domain/status';
import StatusChart from './statusChart';
import Monster from './monster';
type Props = {
  statusStore?: StatusStoreType;
};

@inject('statusStore')
@observer
class Top extends Component<Props> {
  render() {
    const statusStore = this.props.statusStore;
    const status = statusStore ? statusStore.status : Status.blank;
    const lastDelta =
      statusStore && statusStore.lastDelta
        ? statusStore.lastDelta
        : Status.blank;
    return (
      <div>
        <StatusChart status={status} lastDelta={lastDelta} />
        <Monster status={status} />
      </div>
    );
  }
}

class TopWithProps extends Component {
  render() {
    return (
      <Provider statusStore={statusStore}>
        <Top />
      </Provider>
    );
  }
}

export default TopWithProps;
