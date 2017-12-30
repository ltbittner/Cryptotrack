
import React from 'react';
import { connect } from 'react-redux';
import './BuyList.css';

import {
  selectors as BuySelectors
} from '../../redux/buys/buys';

import {
  selectors as PriceSelectors
} from '../../redux/prices/prices';

import BuyRow from '../BuyRow/BuyRow';

class BuyList extends React.Component {
  render() {
    return (
      <div className='buy-list'>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Amount Remaining</th>
              <th>Buy Price</th>
              <th>Current Price (BTC)</th>
              <th>% Change</th>
              <th>Options</th>
            </tr>
            </thead>
        
            {
              this.props.buys.map((buy, index) => {
                return (
                  <BuyRow key={buy.id} buy={buy} index={index} currentBTCPrice={this.props.currentBTCPrice} />
                )
              })
            }
         
        </table>  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    buys: BuySelectors.getBuysAsArray(state),
    currentBTCPrice: PriceSelectors.getBTCPrice(state)
  };
}

export default connect(mapStateToProps)(BuyList);