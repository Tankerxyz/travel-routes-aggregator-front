import React from 'react';

interface IProps {
    item: any
}

class TripItem extends React.PureComponent<IProps> {

  render() {
    const { item } = this.props;

    return (
      <tr>
        <td>
          <a className="link"
             target="_blank"
             rel="noopener noreferrer"
             href={item.links._front}
             onContextMenu={() => console.log(item)}
          >
            {item.permanent_id}
          </a>
        </td>
        <td>
          {item.departure_date}
        </td>
        <td>
          {item.price.string_value}
        </td>
        <td>{~~(item.duration.value / 60 ** 2) + 'h'}</td>
      </tr>
    );
  }
}

export default TripItem;