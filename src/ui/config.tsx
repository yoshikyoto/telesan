import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import configStore, { ConfigStoreType } from '../store/config';

type Props = {
  store?: ConfigStoreType;
};

@inject('store')
@observer
class Config extends Component<Props> {
  render() {
    const { store } = this.props;
    return (
      <div>
        <h1>設定</h1>
        <Link to="/">閉じる</Link>
        <div>
          ステータス更新間隔:
          <input type="text" onChange={e => this.handleTestChange(e)} /> 分
        </div>
        <div>debug: {store ? store.test : ''}</div>
      </div>
    );
  }

  handleTestChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!this.props.store) {
      return;
    }
    const value = Number(event.target.value);
    if (isNaN(value)) {
      return;
    }
    if (value < 1) {
      return;
    }
    this.props.store.changeTest(value);
  }
}

class ConfigWithProps extends Component {
  render() {
    return (
      <Provider store={configStore}>
        <Config />
      </Provider>
    );
  }
}

export default ConfigWithProps;
