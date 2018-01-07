import React from 'react';
import './RightPanel.css';
import {connect} from 'react-redux';

import {
  selectors as NavSelectors,
  actions as NavActions
} from '../../redux/nav/nav';

class RightPanel extends React.PureComponent {

  switchTab = (tab) => {
    this.props.switchTab(tab)
  }
  
  render() {
    const {currentTab} = this.props;
    return (
      <div className='rightPanel'>
        <div className={`option ${currentTab === 'assets' ? 'selected' : ''}`} onClick={() => { this.switchTab('assets') }}>
          <i className="material-icons">attach_money</i>
          <p>Assets</p>
        </div>

        <div className={`option ${currentTab === 'watch' ? 'selected' : ''}`} onClick={() => { this.switchTab('watch') }}>
          <i className="material-icons">remove_red_eye</i>
          <p>Watch</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentTab: NavSelectors.getCurrentTab(state)
})

const mapDispatchToProps = {
  switchTab: NavActions.setTab
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);