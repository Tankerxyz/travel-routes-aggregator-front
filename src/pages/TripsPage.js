import React from 'react';
import { observer, inject } from 'mobx-react';

import TripsList from '../components/TripsList';

class TripsPage extends React.Component {

  componentDidMount() {
    this.props.tripsStore.fetchTrips();
  }

  onInputChange = () => (e) => {
    e.persist();

    this.props.tripsStore.changeOptValue(e.target.getAttribute("name"), e.target.value);
  };

  renderSearchFormInputs = (opt) => {
    return Object.keys(opt).map((key, i) => (
      <label key={i}>
        {key.toUpperCase()}
        <input onChange={this.onInputChange({key})} name={key} value={(() => opt[key])()} />
      </label>
    ));
  };

  render() {
    const { tripsStore } = this.props;

    return (
      <div>
        <header>
          <p>
            count: {tripsStore.trips.length}
          </p>
        </header>

        {
          this.renderSearchFormInputs(tripsStore.opt)
        }

        <button style={{display: "block"}} onClick={tripsStore.fetchTrips}>
          Load data
        </button>

        {
          tripsStore.pending
            ? <marquee style={{width: 100}}>Loading...</marquee> // eslint-disable-line
            : <TripsList trips={tripsStore.trips} />
        }
      </div>
    );
  }
}

export default inject('tripsStore')(observer(TripsPage));