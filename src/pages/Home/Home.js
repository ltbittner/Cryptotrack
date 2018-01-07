import React from 'react';

import { connect } from 'react-redux';
import './Home.css';

import {
  actions as BuyActions
} from '../../redux/buys/buys';

import {
  selectors as PriceSelectors
} from '../../redux/prices/prices';


import BuyList from '../../components/BuyList/BuyList';
import Header from '../../components/Header/Header'

class Home extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      addBuyModal: false
    };
  }

  componentDidMount() {

  }

  
  
  render() {
    return (
      <div className='home'>
        <BuyList />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentBTCPrice: PriceSelectors.getBTCPrice(state)
})

const mapDispatchToProps = {
  addBuy: BuyActions.addBuy
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);