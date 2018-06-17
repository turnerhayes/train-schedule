export const getSchedule = (state) => state.getIn(['schedule', 'items']);

export const getLastScheduleUpdate = (state) => state.getIn(['schedule', 'lastUpdated']);
