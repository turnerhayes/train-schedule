import assert from 'assert';

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

export function formatTime({
  date,
  hours,
  minutes,
}) {
  assert(
    date || (hours !== undefined && minutes !== undefined),
    'Must pass either a date or hours and minutes arguments'
  );

  if (date) {
    hours = date.getHours();
    minutes = date.getMinutes();
  }

  return `${hours % 12}:${zeroPad(minutes)} ${
          hours >= 12 ?
            'PM' :
            'AM'
        }`;
}
