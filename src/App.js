import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';

import './App.css';
import TripsPage from "./pages/TripsPage";

import tripsStore from './store/TripsStore';

const stores = { tripsStore };

class App extends Component {

  render () {
    return (
      <Provider {...stores}>
        <div>
          <TripsPage />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

export default App;
