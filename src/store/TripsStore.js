import { observable, decorate } from 'mobx';

class TripsStore {
  trips = [];
  pending = false;
  opt = {
    fn: "Кирилловка",
    tn: "Львов",
    db: (() => {
        const currentDate = new Date();

        currentDate.setDate(currentDate.getDate() + 1);

        return `15-11-2018` || `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`;
    })(),
    radius: 300,
    de: null,
    hb: null,
  };

  constructor(tripsApi) {
    this.tripsApi = tripsApi;
  }

  fetchTrips = async () => {
    this.pending = true;
    this.trips = await this.tripsApi.fetchTrips(this.opt);
    this.pending = false;
  };
}

export default decorate(TripsStore, {
  trips: observable,
  opt: observable,
  pending: observable,
});