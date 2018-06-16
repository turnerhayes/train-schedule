/* global Promise */

import Papa from 'papaparse';

import storedContent from './Departures.csv';

function getData() {
  if (navigator.onLine) {
    return window.fetch('/api/schedule/')
      .then(
        (response) => {
          if (!response.ok || response.status >= 300) {
            throw new Error(response.statusText);
          }

          return response.text();
        }
      );
  }

  return Promise.resolve(storedContent);
}


function parseCSV(text) {
  const result = Papa.parse(text, {
    dynamicTyping: true,
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
}

export function getSchedule() {
  return getData().then(
    (text) => parseCSV(text)
  );
}
