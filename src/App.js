import React, { Component } from 'react';
import Firebase from 'firebase';
import { Provider } from 'react-redux';
import test from './firebase/writes/writes';
import logo from './logo.svg';
import store from './redux/index';
import './App.css';
import Root from './Root';

import {
  actions as BuyActions
} from './redux/buys/buys';


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>  
    );
  }
}


export default App;
