import React from 'react';

import { formatTime } from 'utils/datetime';

import 'styles/dotmatrix.css';

// Check once a second
const INTERVAL_CHECK_DELAY = 1000;

export default class Clock extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = this.getTimeState();
  }

  componentDidMount() {
    this.intervalHandle = setInterval(
      this.setTime,
      INTERVAL_CHECK_DELAY
    );
  }

  componentWillUnmount() {
    // istanbul ignore next
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
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
    this.setState(this.getTimeState());
  }

  render() {
    const {
      hours,
      minutes,
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
