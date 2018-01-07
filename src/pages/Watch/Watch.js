import React from 'react';
import {connect} from 'react-redux';
import './Watch.css';

import {
  selectors as WatchSelectors,
  actions as WatchActions
} from '../../redux/watches/watches';

import WatchList from '../../components/WatchList/WatchList';

class Watch extends React.PureComponent {

  componentDidMount() {
    
  }
  

  render() {
    return (
      <div className='watch-page'>
        <WatchList />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchWatches: WatchActions.fetchWatches
};

export default connect(null, mapDispatchToProps)(Watch);