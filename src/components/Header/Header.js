import React from 'react';
import './Header.css';
import { connect } from 'react-redux';

import AddBuyModal from '../AddBuyModal/AddBuyModal';
import AddWatchModal from '../AddWatchModal/AddWatchModal';

import {
  actions as BuyActions
} from '../../redux/buys/buys';

import {
  actions as WatchActions
} from '../../redux/watches/watches';

import {
  selectors as PriceSelectors
} from '../../redux/prices/prices';

import {
  selectors as NavSelectors
} from '../../redux/nav/nav';

class Header extends React.Component {

  constructor() {
    super();

    this.state = {
      addBuyModal: false,
      addWatchModal: false
    };
  }

  toggleAddWatch = () => {
    this.setState({
      addWatchModal: !this.state.addWatchModal
    });
  }

  toggleAddBuy = () => {
    this.setState({
      addBuyModal: !this.state.addBuyModal
    });
  }

  submitAddBuy = (data) => {
    this.props.addBuy(data);
    this.toggleAddBuy();
  }

  submitAddWatch = (data) => {
    this.props.addWatch(data);
    this.toggleAddWatch();
  }

  render() {
    return (
      <div className='header'>

        <h2>Cryptowatch</h2>

        {
          this.props.currentTab === 'assets' &&
          <button onClick={this.toggleAddBuy}>Add Buy</button> 
        }

        {
          this.props.currentTab === 'watch' &&
          <button onClick={this.toggleAddWatch}>Add Watch</button> 
        }

        <AddWatchModal
          visible={this.state.addWatchModal}
          onClose={this.toggleAddWatch}
          onSubmit={this.submitAddWatch}
 
        />
        
        
        <AddBuyModal
          visible={this.state.addBuyModal}
          onClose={this.toggleAddBuy}
          onSubmit={this.submitAddBuy}
          currentBTCPrice={this.props.currentBTCPrice}
        />        
      </div>  
    );
  }

}

const mapStateToProps = (state) => ({
  currentBTCPrice: PriceSelectors.getBTCPrice(state),
  currentTab: NavSelectors.getCurrentTab(state)
})

const mapDispatchToProps = {
  addBuy: BuyActions.addBuy,
  addWatch: WatchActions.addWatch
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);