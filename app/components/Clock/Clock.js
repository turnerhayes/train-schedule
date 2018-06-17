import React from 'react';

import { formatTime } from 'utils/datetime';

import 'styles/dotmatrix.css';

// Check once a second
const INTERVAL_CHECK_DELAY = 1000;

/*
 * Left-pads the number with zeros, up to 2 digits wide.
 *
 * @param {Number} num - the number to pad
 *
 * @returns {String} the padded number
 */
function zeroPad(num) {
  if (num >= 10) {
    return num + '';
  }

  return '0' + num;
}

export default class Clock extends React.PureComponent {
  constructor(...args) {
    super(...args);

    const date = new Date();

    this.state = this.getTimeState();
  }

  /**
   * Gets the current local time in a format to be put into state.
   *
   * @returns {{hours: Number, minutes: Number}} the hours and minutes
   *  values of the current time.
   */
  getTimeState = () => {
    const date = new Date();
    
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
    };
  }

  /**
   * Sets the component state to reflect the current local time.
   *
   * @returns {void}
   */
  setTime = () => {
    const date = new Date();
    
    this.setState(this.getTimeState());
  }

  componentDidMount() {
    this.intervalHandle = setInterval(
      this.setTime,
      INTERVAL_CHECK_DELAY
    );
  }

  componentWillUnmount() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
  }

  render() {
    const {
      hours,
      minutes
    } = this.state;

    return (
      <span
        className="dotmatrix"
      >
        {formatTime({ hours, minutes })}
      </span>
    );
  }
}
