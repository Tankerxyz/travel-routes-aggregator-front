import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';
import TripItem from "../TripItem";

class TripsList extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
  };

  renderTrips() {
    return this.props.trips.map((trip, index) =>
      <TripItem key={index} item={trip}/>
    );
  };

  render() {

    return (
      <table>
        <tbody>
        <tr>
          <th>Link</th>
          <th>Date</th>
          <th>Price</th>
          <th>Duration</th>
        </tr>
        {
          this.renderTrips()
        }
        </tbody>
      </table>
    );
  }
}

export default observer(TripsList);