import React from 'react';
import './StatLabel.css';
export default class StatLabel extends React.Component {

  static defaultProps = {
    showColors: true,
    negativeColor: 'red',
    positiveColor: 'green',
    color: 'white'
  };

  render() {
    const { showColors, value, negativeColor, positiveColor, color: defaultColor } = this.props;
    let color = defaultColor;
    if (showColors) {
      if (value > 0) {
        color = positiveColor;
      } else if (value < 0) {
        color = negativeColor;
      }
    }

    return (
      <span className='stat-label'>
        <pre>  
          <p>{this.props.title}: </p>
          {this.props.split && <br />}
          <p><span style={{ color }}>{this.props.prefix}{this.props.value}{this.props.suffix}</span></p>
        </pre>  
      </span>
    );
  }
}