import React from 'react';
import './WatchRow.css';

import {connect} from 'react-redux';

import {
  actions as WatchActions
} from '../../redux/watches/watches';

class WatchRow extends React.Component {

  deleteWatch = () => {
    this.props.deleteWatch(this.props.watch.id);
  }

  render () {
    const {watch} = this.props;
    const s = this.props.index % 2 === 0 ? 'even' : 'odd';

    const backgroundColor = watch.currentPrice < watch.buyTarget ? 'rgba(0,255,0,0.25)' : 'rgba(255,0,0,0.45)';

    return (
      <tr className={`watch-row ${s}`}>
        <td className='item symbol'>{ watch.symbol }</td>
        <td className='item target'>{ watch.buyTarget }</td>
        <td className='item currentPrice' style={{ backgroundColor }}>{ watch.currentPrice }</td>
        <td className='item options'>
          <p onClick={this.deleteWatch}>Delete</p>
        </td>
          
      </tr>
    )
  }
}

const mapDispatchToProps = {
  deleteWatch: WatchActions.removeWatch
};

export default connect(null, mapDispatchToProps)(WatchRow);