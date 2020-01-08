import React from 'react';
import PropTypes from 'prop-types';

import pinShape from '../../../helpers/propz/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deletePin: PropTypes.func,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, deletePin } = this.props;
    deletePin(pin.id);
  }

  render() {
    const { pin } = this.props;
    return (
      <div class="card pin-card col-3">
        <img src={pin.imageUrl} class="card-img-top" alt={pin.title}/>
        <div class="card-body">
          <h5 class="card-title">{pin.title}</h5>
          <button className="btn btn-danger" onClick={this.deletePinEvent}>Delete Pin</button>
        </div>
      </div>
    );
  }
}

export default Pin;
