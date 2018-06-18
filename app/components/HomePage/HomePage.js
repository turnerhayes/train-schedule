/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Schedule from 'containers/Schedule';
import Clock from 'components/Clock';
import DateDisplay from 'components/DateDisplay';

const GridContainer = styled.div`
  display: grid;
  grid-template-areas: "date clock"
    "schedule schedule";
`;

const DateDisplayContainer = styled.div`
  grid-area: date;
`;

const ClockContainer = styled.div`
  grid-area: clock;
  justify-self: end;
  text-align: right;
`;

const ScheduleContainer = styled.div`
  grid-area: schedule;
`;

const CurrentTimeLabel = styled.div`
  text-transform: uppercase;
`;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    repos: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
    ]),
    onSubmitForm: PropTypes.func,
    username: PropTypes.string,
    onChangeUsername: PropTypes.func,
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Live MBTA Train Schedule</title>
          <meta name="description" content="A real-time view of the MBTA train schedule" />
        </Helmet>
        <GridContainer>
          <DateDisplayContainer>
            <DateDisplay />
          </DateDisplayContainer>
          <ClockContainer
            className="dotmatrix"
          >
            <CurrentTimeLabel>
            Current Time
            </CurrentTimeLabel>
            <Clock />
          </ClockContainer>
          <ScheduleContainer >
            <Schedule />
          </ScheduleContainer>
        </GridContainer>
      </article>
    );
  }
}

export default HomePage;
