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
        <input type="text" onChange={e => this.handleTestChange(e)} />
        <div>{store ? store.test : ''}</div>
      </div>
    );
  }

  handleTestChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.store) {
      this.props.store.changeTest(event.target.value);
    }
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
