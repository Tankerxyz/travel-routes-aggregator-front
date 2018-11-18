import { observable, action, has } from 'mobx';
import { getTomorowDateString } from "../utils";
import TripsApi from "../api/TripsApi";

class TripsStore {
  @observable trips: Array<any> = [];
  @observable pending = false;
  @observable opt: any = {
    fn: "Кирилловка",
    tn: "Львов",
    db: getTomorowDateString(),
    radius: 300,
    de: '',
    hb: '',
  };

  tripsApi: TripsApi;

  constructor(tripsApi: any) {
    this.tripsApi = tripsApi;
  }

  changeOptValue(key: string, value: string) {
    if (has(this.opt, key)) {
      this.opt[key] = value;
    }
  }

  @action
  fetchTrips = async () => {
    this.pending = true;
    this.trips = await this.tripsApi.fetchTrips(this.opt);
    this.pending = false;
  };
}

const tripsStore = new TripsStore(new TripsApi());

export default tripsStore;
export { TripsStore };