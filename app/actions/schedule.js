export const GET_SCHEDULE = '@APP/GET_SCHEDULE';

export function getSchedule() {
  return {
    type: GET_SCHEDULE,
  };
}

export const UPDATE_SCHEDULE = '@APP/UPDATE_SCHEDULE';

export function updateSchedule({ schedule }) {
  return {
    type: UPDATE_SCHEDULE,
    payload: { schedule },
  };
}
