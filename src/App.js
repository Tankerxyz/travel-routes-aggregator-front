import React, { Component } from 'react';

import { autorun } from 'mobx';

import TripsStore from './store/TripsStore';
import TripsApi from './api/TripsApi';
import './App.css';
import TripsPage from "./pages/TripsPage";

class App extends Component {
  constructor() {
    super();

    const store = new TripsStore(new TripsApi());

    this.tripsStore = store;
  }

  render () {
    return (
      <TripsPage store={this.tripsStore} />
    )
  }
}

export default App;
