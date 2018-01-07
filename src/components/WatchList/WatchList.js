import React from 'react';
import {connect} from 'react-redux';
import './WatchList.css';
import {
  selectors as WatchSelectors
} from '../../redux/watches/watches';

import WatchRow from  '../WatchRow/WatchRow';

class WatchList extends React.Component {
  render() {
    return (
      <div className='watch-list'>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Buy Target</th>
              <th>Current Price</th>
              <th>% Diff</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.watches.map((watch, index) => {
                return <WatchRow watch={watch} index={index}/>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  watches: WatchSelectors.getWatchesAsArray(state)
})

export default connect(mapStateToProps)(WatchList);