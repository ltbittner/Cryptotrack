import React from 'react';
import Modal from 'react-modal';
import './AddBuyModal.css';

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

class AddBuyModal extends React.Component {

  constructor() {
    super();

    this.$symbol = null;
    this.$buyPrice = null;
    this.$amount = null;
  }

  onSubmit = () => {
    const symbol = this.$symbol.value;
    const buyPrice = this.$buyPrice.value;
    const amount = this.$amount.value;

    const sellTarget1 = this.$sellTargetOne.value;
    const sellTarget2 = this.$sellTargetTwo.value;
    const sellTarget3 = this.$sellTargetThree.value;

    this.props.onSubmit({ symbol, buyPrice, amount, sellTarget1, sellTarget2, sellTarget3 });
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
              <p>Symbol</p> <input ref={(ref) => { this.$symbol = ref }} type='text' />
            </div>

              <div className='form-section'>
                <p>Amount</p> <input ref={(ref) => { this.$amount = ref }} type='text' />
            </div>  
            
            <div className='form-section'>
              <p>Buy Price (BTC)</p> <input ref={(ref) => { this.$buyPrice = ref }} type='text' />
            </div>
          </div>  

          <div className='form-row'>
            <div className='form-section'>
              <p>Sell Target 1</p> <input ref={(ref) => { this.$sellTargetOne = ref }} type='text' />
            </div>

            <div className='form-section'>
              <p>Sell Target 2</p> <input ref={(ref) => { this.$sellTargetTwo = ref }} type='text' />
            </div>

            <div className='form-section'>
              <p>Sell Target 3</p> <input ref={(ref) => { this.$sellTargetThree = ref }} type='text' />
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

export default AddBuyModal;