import React from 'react';
import { connect } from 'react-redux';
import './BuyRow.css';
import {
  actions as BuyActions,
  selectors as BuySelectors
} from '../../redux/buys/buys';
import { getPercentDiff, getChangeInBTCForSell, getUnrealizedProfit, getRealizedProfit, BTCtoCAD } from '../../utils/math';

import StatLabel from '../StatLabel/StatLabel';

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'
 

import AddSellModal from '../AddSellModal/AddSellModal';

class BuyRow extends React.Component {

  constructor() {
    super();

    this.state = {
      expanded: false,
      addSellModal: false
    };
  }

  toggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  delete = () => {
    const { buy, deleteBuy } = this.props;

    confirmAlert({
      title: 'Confirm Deletion',                        // Title dialog
      message: 'Are you sure to do this?',               // Message dialog
      confirmLabel: 'Confirm',                           // Text button confirm
      cancelLabel: 'Cancel',                             // Text button cancel
      onConfirm: () => { deleteBuy(buy.id); },    // Action after Confirm
      onCancel: () => { }      // Action after Cancel
    })
    
    
  }

  sell = (data) => {
    this.props.sellBuy(data);
    this.toggleSellModal();
  }

  toggleSellModal = () => {
    this.setState({
      addSellModal: !this.state.addSellModal
    });
  }

  toBittrex = () => {
    window.open(`https://bittrex.com/Market/Index?MarketName=BTC-${this.props.buy.symbol}`);
  }

  getAdvancedRow = () => {
    const { currentBTCPrice, buy } = this.props;
    const { buyPrice, initialAmount, amount } = this.props.buy;

    const totalBitCoinSpent = (buyPrice * amount).toFixed(6);
    const totalCADWorth = ((buyPrice * amount) * currentBTCPrice).toFixed(2);

    const unrealizedProfit = getUnrealizedProfit(buy);

    const unrealizedProfitCad = BTCtoCAD(unrealizedProfit, currentBTCPrice);


    return (
      <tr className='advanced-row'>
        <td colSpan='6'>
          <StatLabel
            title={`Amount in BTC`}
            value={totalBitCoinSpent}
            showColors={false}
          />

          <StatLabel
            title={`Amount in CAD`}
            value={totalCADWorth}
            showColors={false}
            prefix='$'
          />

          <StatLabel
            title={`Unrealized Profit/Loss (BTC)`}
            value={unrealizedProfit}
          />

          <StatLabel
            title={`Unrealized Profit/Loss (CAD)`}
            value={unrealizedProfitCad}
            prefix='$'
          />

        <br />

          <StatLabel
            title={`Realized Profit/Loss (BTC)`}
            value={getRealizedProfit(buy)}
          />

        
          {
            buy.sellTargets && buy.sellTargets.sellTarget1 &&
            <span>
              
              <StatLabel
                title={`Sell Target 1`}
                value={buy.sellTargets.sellTarget1}
                showColors={false}
              />

              <StatLabel
                title={`Sell Target 2`}
                value={buy.sellTargets.sellTarget2}
                showColors={false}
              />

              <StatLabel
                title={`Sell Target 3`}
                value={buy.sellTargets.sellTarget3}
                showColors={false}
              />
            </span>
          }

          

        </td>
      </tr>
    );
  }

  getSellRows = () => {

    const { sells, buy } = this.props;

    const { buyPrice } = buy;

    return sells.map((sell) => {
      const { sellPrice } = sell;
      return (
        <tr className='sell-row'>
          <td colSpan='6'>
            <StatLabel
              title='Amount Sold'
              value={sell.amount}
              showColors={false}
              color='black'
            />

            <StatLabel
              title='Sell Price (BTC)'
              value={sell.sellPrice}
              showColors={false}
              color='black'
            />

            <StatLabel
              title='Change'
              value={getPercentDiff(buyPrice, sellPrice)}
              suffix='%'
              color='black'
            />

            <StatLabel
              title='Realized Profit/Loss (BTC)'
              value={getChangeInBTCForSell(buy, sell)}
              color='black'
            />

          </td>
        </tr>  
      )
    });
  }

  render() {

    const percentChange = getPercentDiff(this.props.buy.buyPrice, this.props.buy.currentPrice);
    const color = percentChange > 0 ? 'rgba(0,255,0,0.25)' : 'rgba(255,0,0,0.45)';

    const bg = this.props.index % 2 === 0 ? 'even' : 'odd';
    const components = [];
    const main = (
      <tr className={`buy-row ${bg}`}>
        <td className='item symbol'>
          <span onClick={this.toBittrex}><p>{this.props.buy.symbol}</p></span>
        </td>  
        
        <td className='item amount'>
          <p>{this.props.buy.amount}</p>
        </td>

        <td className='item price'>
          <p>{this.props.buy.buyPrice}</p>
        </td>  

        <td className='item current'>
          <p>{this.props.buy.currentPrice}</p>
        </td>

        <td className='item change' style={{ backgroundColor: color }}>
          <p>{percentChange}</p>
        </td>

        <td className='item options'>
          <p onClick={this.delete}>Delete</p>
          <p onClick={this.toggleSellModal}>Sell</p>
          <p onClick={this.toggleExpand}>{this.state.expanded ? 'Less' : 'More'} Details</p>
        </td>

        <AddSellModal
          visible={this.state.addSellModal}
          buy={this.props.buy}
          currentBTCPrice={this.props.currentBTCPrice}
          onSubmit={this.sell}
          onClose={this.toggleSellModal}
        />
      </tr> 
    );

    components.push(main);

    if (this.state.expanded) {
      components.push(this.getAdvancedRow());
    }

    components.push(...this.getSellRows());

    return components;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sells: BuySelectors.getSellsForBuy(state, ownProps.buy.id)
  };
}

const mapDispatchToProps = {
  deleteBuy: BuyActions.deleteBuy,
  sellBuy: BuyActions.sellBuy
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyRow);