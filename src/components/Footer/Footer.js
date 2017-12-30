import React from 'react';
import './Footer.css';
import { connect } from 'react-redux';

import {
  selectors as PriceSelectors
} from '../../redux/prices/prices';

import {
  selectors as BuySelectors
} from '../../redux/buys/buys';

import StatLabel from '../StatLabel/StatLabel';

class Footer extends React.Component {
  

  render() {
    const { currentBTCPrice, totalBTC, averagePercentChange, totalPercentChange } = this.props;
    return (
      <div className='footer'>
        <StatLabel title='Current BTC Price' value={currentBTCPrice} prefix='$' showColors={false} />
        <StatLabel title='Total BTC In Alts' value={totalBTC.toFixed(8)} showColors={false} />
        <StatLabel title='Total $ In Alts' value={(totalBTC.toFixed(8) * currentBTCPrice).toFixed(2)} showColors={false} prefix='$' />
        <StatLabel title='Average % Change' value={averagePercentChange} suffix='%'/>
        <StatLabel title='Total % Change' value={totalPercentChange} suffix='%' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalBTC: BuySelectors.getTotalBTCValue(state),
    averagePercentChange: BuySelectors.getTotalAveragePercentChange(state),
    totalPercentChange: BuySelectors.getTotalPercentChange(state).toFixed(2) || 0,
    currentBTCPrice: PriceSelectors.getBTCPrice(state),
  };
}

export default connect(mapStateToProps)(Footer);