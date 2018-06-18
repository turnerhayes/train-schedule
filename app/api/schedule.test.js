import fetchMock from 'fetch-mock';
import Papa from 'papaparse';

import { getSchedule } from 'api/schedule';

function unixTimestamp(date) {
  return Math.floor(date.getTime() / 1000);
}

describe('Schedule API', () => {
  describe('getSchedule', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('should resolve with an array of schedule items', async () => {
      expect.assertions(1);

      const now = new Date();

      const items = [
        {
          Timestamp: unixTimestamp(now),
          ScheduledTime: unixTimestamp(new Date('2018-06-16T19:45')),
          Trip: 1234,
          Lateness: 0,
          Origin: 'Narnia',
          Destination: 'Neverland',
          Status: 'On Time',
          Track: null,
        },
        {
          Timestamp: unixTimestamp(now),
          ScheduledTime: unixTimestamp(new Date('2018-06-16T20:00')),
          Trip: 5678,
          Lateness: 0,
          Origin: 'Narnia',
          Destination: 'The Matrix',
          Status: 'Boarding',
          Track: null,
        },
      ];

      const csv = Papa.unparse(
        {
          fields: [
            'Timestamp',
            'Origin',
            'Trip',
            'Destination',
            'ScheduledTime',
            'Lateness',
            'Track',
            'Status',
          ],

          data: items,
        },
        {
          quotes: [
            false,
            true,
            true,
            true,
            false,
            false,
            true,
            true,
          ],
        }
      );

      fetchMock.get('/api/schedule/', {
        body: csv,
      });

      const results = await getSchedule();

      expect(results).toEqual(items);
    });

    it('should throw an error on bad response', async () => {
      expect.assertions(1);

      fetchMock.get('/api/schedule/', 500);

      await expect(getSchedule()).rejects.toEqual(new Error('Internal Server Error'));
    });
  });
});
