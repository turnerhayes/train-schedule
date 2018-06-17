import React from 'react';

import 'styles/dotmatrix.css';

// Check once a second
const INTERVAL_CHECK_DELAY = 1000;

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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

export default class DateDisplay extends React.PureComponent {
  constructor(...args) {
    super(...args);

    const date = new Date();

    this.state = this.getDateState();
  }

  /**
   * Gets the current local time in a format to be put into state.
   *
   * @returns {{dayOfWeek: Number, day: Number, month: Number, year: Number}} the day index
   *  in the week, day of month, month and year.
   */
  getDateState = () => {
    const date = new Date();
    
    return {
      dayOfWeek: date.getDay(),
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  }

  /**
   * Sets the component state to reflect the current local date.
   *
   * @returns {void}
   */
  setDate = () => {
    const date = new Date();
    
    this.setState(this.getDateState());
  }

  componentDidMount() {
    this.intervalHandle = setInterval(
      this.setDate,
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
      dayOfWeek,
      day,
      month,
      year
    } = this.state;

    return (
      <div
        className="dotmatrix"
      >
        <div>
          {DAY_NAMES[dayOfWeek]}
        </div>
        <div>
          {/* month is 0-based */}
          {[zeroPad(month + 1), zeroPad(day), year].join('-')}
        </div>
      </div>
    );
  }
}

