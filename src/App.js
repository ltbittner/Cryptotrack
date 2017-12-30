import React, { Component } from 'react';
import Firebase from 'firebase';
import { Provider } from 'react-redux';
import test from './firebase/writes/writes';
import logo from './logo.svg';
import store from './redux/index';
import './App.css';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer'

import {
  actions as BuyActions
} from './redux/buys/buys';


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div>  
          <Home />
          <Footer />
        </div>  
      </Provider>  
    );
  }
}


export default App;
