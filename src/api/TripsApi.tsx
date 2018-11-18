
class TripsApi {

  fetchTrips = async (opt: any) => {
    return await fetch('/api/trips', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opt)
    })
      .then((res) => res.json());
  }
}

export default TripsApi;