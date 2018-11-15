import { observable, decorate, action, has } from 'mobx';
import { getTomorowDateString } from "../utils";
import TripsApi from "../api/TripsApi";

class TripsStore {
  trips = [];
  pending = false;
  opt = {
    fn: "Кирилловка",
    tn: "Львов",
    db: getTomorowDateString(),
    radius: 300,
    de: '',
    hb: '',
  };

  constructor(tripsApi) {
    this.tripsApi = tripsApi;
  }

  changeOptValue(key, value) {
    if (has(this.opt, key)) {
      this.opt[key] = value;
    }
  }

  fetchTrips = async () => {
    this.pending = true;
    this.trips = await this.tripsApi.fetchTrips(this.opt);
    this.pending = false;
  };
}

const tripsStore = new (decorate(TripsStore, { // singleton
  trips: observable,
  opt: observable,
  pending: observable,
  fetchTrips: action,
}))(new TripsApi());

export default tripsStore;
export { TripsStore };