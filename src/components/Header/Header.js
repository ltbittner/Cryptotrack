import React from 'react';
import './Header.css';
import { connect } from 'react-redux';

import AddBuyModal from '../AddBuyModal/AddBuyModal';

import {
  actions as BuyActions
} from '../../redux/buys/buys';

import {
  selectors as PriceSelectors
} from '../../redux/prices/prices';

class Header extends React.Component {

  constructor() {
    super();

    this.state = {
      addBuyModal: false
    };
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

  render() {
    return (
      <div className='header'>

        <h2>Cryptowatch</h2>

        <button onClick={this.toggleAddBuy}>Add Buy</button> 
        
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
  currentBTCPrice: PriceSelectors.getBTCPrice(state)
})

const mapDispatchToProps = {
  addBuy: BuyActions.addBuy
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);