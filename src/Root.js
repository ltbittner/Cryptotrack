import React from 'react';
import Home from './pages/Home/Home';
import Watch from './pages/Watch/Watch';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header';
import RightPanel from './components/RightPanel/RightPanel';
import {connect} from 'react-redux';
import {
  selectors as NavSelectors
} from './redux/nav/nav';

import {
  updateCurrentPrices
} from './redux/shared';

import {
  actions as BuyActions
} from './redux/buys/buys';

import {
  actions as WatchActions
} from './redux/watches/watches';

class Root extends React.PureComponent {

  
  componentWillMount() {
    this.props.fetchBuys(() => {
      this.props.fetchWatches();
      setTimeout(this.props.updateCurrentPrices, 500)
      setInterval(this.props.updateCurrentPrices, 10000)
    });
  }
  

  render() {
    return (
      <div>

        <Header />  
        {
          this.props.currentTab === 'assets' &&
          <Home />
        }

        {
          this.props.currentTab === 'watch' &&
          <Watch />
        }
       
        <RightPanel />
        <Footer />
      </div>  
    );
  }
}

const mapStateToProps = (state) => ({
  currentTab: NavSelectors.getCurrentTab(state)
})

const mapDispatchToProps = {
  fetchBuys: BuyActions.fetchBuys,
  fetchWatches: WatchActions.fetchWatches,
  updateCurrentPrices: updateCurrentPrices,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);