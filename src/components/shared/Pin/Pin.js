import React from 'react';

import pinShape from '../../../helpers/propz/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;
    return (
      <div class="card pin-card col-3">
        <img src={pin.imageUrl} class="card-img-top" alt={pin.title}/>
        <div class="card-body">
          <h5 class="card-title">{pin.title}</h5>
        </div>
      </div>
    );
  }
}

export default Pin;
