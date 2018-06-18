import { formatTime } from 'utils/datetime';

describe('datetime utils', () => {
  describe('formatTime', () => {
    it('should return a formatted date when given a Date object', () => {
      const date = new Date('2012-12-21T15:05');

      const dateString = formatTime({ date });

      expect(dateString).toBe('3:05 PM');
    });

    it('should return a formatted date when given a hours/minutes object', () => {
      const args = {
        hours: 9,
        minutes: 13,
      };

      const dateString = formatTime(args);

      expect(dateString).toBe('9:13 AM');
    });

    it('should throw if no date or object is provided', () => {
      expect(
        () => formatTime({})
      ).toThrow('Must pass either a date or hours and minutes arguments');
    });
  });
});
