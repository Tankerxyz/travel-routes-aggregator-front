import React from 'react';
import { observer, inject } from 'mobx-react';

import TripsList from '../components/TripsList/index';
import { TripsStore } from '../store/TripsStore';

interface IProps {
  tripsStore?: TripsStore,
}

@inject('tripsStore')
@observer
class TripsPage extends React.Component<IProps> {

  componentDidMount() {
    this.props.tripsStore.fetchTrips();
  }

  onInputChange = (key: string) => (e: any) => {
    e.persist();

    this.props.tripsStore.changeOptValue(key, e.target.value);
  };

  renderSearchFormInputs = (opt: any) => {
    return Object.keys(opt).map((key, i) => (
      <label key={i}>
        { key.toUpperCase() }
        <input onChange={this.onInputChange(key)} name={key} value={opt[key]} />
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
            ? <span>Loading...</span> // eslint-disable-line
            : <TripsList trips={tripsStore.trips} />
        }
      </div>
    );
  }
}

export default TripsPage;