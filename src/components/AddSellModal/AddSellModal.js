import React from 'react';
import Modal from 'react-modal';
import './AddSellModal.css';

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

class AddSellModal extends React.Component {

  constructor() {
    super();

    this.$sellPrice = null;
    this.$amount = null;
  }

  onSubmit = () => {
    const id = this.props.buy.id;
    const sellPrice = this.$sellPrice.value;
    const amount = this.$amount.value;

    this.props.onSubmit({ sellPrice, amount, id });
  }


  render() {
    const { symbol, amount } = this.props.buy;
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
              <p>Symbol</p> <input value={symbol} readOnly type='text' />
            </div>

            <div className='form-section'>
              <p>Amount</p> <input defaultValue={amount} ref={(ref) => { this.$amount = ref }} type='text' />
            </div>  
            
            <div className='form-section'>
              <p>Sell Price (BTC)</p> <input ref={(ref) => { this.$sellPrice = ref }} type='text' />
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

export default AddSellModal;