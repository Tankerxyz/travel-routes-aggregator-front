import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    items: [],
    opt: {
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
    },
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      loading: true,
    });

    console.log('loadData: ', JSON.stringify(this.state.opt));

    fetch('/api/trips', {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.opt)
    })
      .then((res) => res.json())
      .then((items) => {
        console.log(items);
        this.setState((prevState) => ({
          items,
          loading: false,
        }));
      })
  }

  onInputChange = (prop) => (e) => {
    e.persist();

    this.setState((prevState) => ({
      opt: {
        ...prevState.opt,
        [e.target.getAttribute("name")]: e.target.value,
      },
    }));
  };

  renderTrips = (item) => {
    console.log()


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
        this.state.items.map((item, i) => {

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
  }

  render() {
    return (
      <div>
        <header>
          <p>
            count: {this.state.items.length}
          </p>
        </header>

        {
          Object.keys(this.state.opt).map((key, i) => (
            <label key={i}>
              {key.toUpperCase()}
              <input onChange={this.onInputChange({key})} name={key} value={this.state.opt[key]} />
            </label>
          ))
        }

        <button style={{display: "block"}} onClick={this.loadData}>
          Load data
        </button>

        {
          this.state.loading 
          ? <p>Loading...</p>
          : this.renderTrips()
        }
      </div>
    );
  }
}

export default App;
