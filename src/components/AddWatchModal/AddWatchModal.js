import React from 'react';
import Modal from 'react-modal';
import './AddWatchModal.css';

import {getCurrentPrice} from '../../services/bittrex';

const modalStyle = {
  content: {
    maxWidth: '40vw',
    maxHeight: '50vh',
    backgroundColor: '#222222',
    margin: 'auto auto',
    minWidth: '700px'
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    opacity: 1
  }
};

class AddWatchModal extends React.Component {

  constructor() {
    super();

    this.$symbol = null;
    this.$buyTarget = null;

    this.currentPrice = 0;
  }

  onSubmit = () => {
    const symbol = this.$symbol.value;
    const buyTarget = this.$buyTarget.value;


    this.props.onSubmit({ symbol, buyTarget });
  }

  getCurrentPrice = async () => {
    const value = this.$symbol.value;
    const price = await getCurrentPrice(value);
    if(price) {
      this.currentPrice = price;
      this.$buyTarget.value = price;
    }
    
  }

  onChangePercent = () => {
    const value = this.$percent.value;
    const newValue = this.currentPrice * (1 - (value / 100));
    this.$buyTarget.value = newValue;
  }

  render() {
    return (
      <Modal
        isOpen={this.props.visible}
        onRequestClose={this.props.onClose}
        contentLabel="Modal"
        style={modalStyle}
      >
        <div className='modal-inner'>
          <div className='form-row'>  
            <div className='form-section'>
              <p>Symbol</p> <input ref={(ref) => { this.$symbol = ref }} onBlur={this.getCurrentPrice} type='text' />
            </div>

              <div className='form-section'>
                <p>Buy Target</p> <input ref={(ref) => { this.$buyTarget = ref }} type='text' />
                <span>-<input ref={(ref) => {this.$percent = ref}} className='percent' type='number' onChange={this.onChangePercent}></input>%</span>
            </div>  
          
          </div>  

          <div className='form-row'>
            <div className='form-section'>
              <button onClick={this.onSubmit}>Done</button>
            </div>  
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddWatchModal;