import React from 'react';
import ReactDom from 'react-dom';
import App from './ui/app';
import Updater from './batch/updater';
import configStore from './store/config';
import statusStore from './store/status';

const container = document.getElementById('contents');

ReactDom.render(<App />, container);

const updater = new Updater(configStore, statusStore);
updater.start();
