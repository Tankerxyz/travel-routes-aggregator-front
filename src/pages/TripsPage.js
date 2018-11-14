import React from 'react';
import { observer } from 'mobx-react';

class TripsPage extends React.Component {

  componentDidMount() {
    this.props.store.fetchTrips();
  }

  onInputChange = () => (e) => {
    e.persist();

    this.props.store.opt[e.target.getAttribute("name")] = e.target.value;
  };

  renderTrips = () => {

    function fn(trips, elFn) {
      return (
        <td>
          <ul>
            {
              trips.map((el, idx) => (
                <li key={idx}>
                  {elFn(el)}
                </li>
              ))
            }
          </ul>
        </td>
      );
    }

    return (<table>
      <tr>
        <th>Link</th>
        <th>Date</th>
        <th>Price</th>
        <th>Duration</th>
      </tr>
      {
        this.props.store.trips.map((item, i) => {

          if (item.length) {
            return (
              <tr key={i}>
                {fn(item, (el) => (
                  <a className="link" target="_blank" key={i} href={el.links._front}>
                    {el.permanent_id}
                  </a>
                ))}
                {fn(item, (el) => el.departure_date)}
                {fn(item, (el) => el.price.string_value)}
              </tr>
            );
          } else {
            return (
              <tr key={i}>
                <td>
                  <a className="link" target="_blank" key={i} href={item.links._front}>
                    {item.permanent_id}
                  </a>
                </td>
                <td>
                  {item.departure_date}
                </td>
                <td>
                  {item.price.string_value}
                </td>
                <td>{~~(item.duration.value / 60**2) + 'h'}</td>
              </tr>
            );
          }
        })
      }
    </table>);
    ;
  };

  render() {
    const { store } = this.props;

    return (
      <div>
        <header>
          <p>
            count: {store.trips.length}
          </p>
        </header>

        {
          Object.keys(store.opt).map((key, i) => (
            <label key={i}>
              {key.toUpperCase()}
              <input onChange={this.onInputChange({key})} name={key} value={store.opt[key]} />
            </label>
          ))
        }

        <button style={{display: "block"}} onClick={store.fetchItems}>
          Load data
        </button>

        {
          store.pending
            ? <marquee style={{width: 100}}>Loading...</marquee>
            : this.renderTrips()
        }
      </div>
    );
  }
};

export default observer(TripsPage);