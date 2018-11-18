import React, { Component } from 'react';
import { observer } from 'mobx-react';

import TripItem from "../TripItem/index";

interface IProps {
  trips: Array<any>,
}

@observer
class TripsList extends Component<IProps> {

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

export default TripsList;