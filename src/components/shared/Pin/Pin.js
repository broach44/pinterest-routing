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
      <div className="card pin-card col-3">
        <img src={pin.imageUrl} className="card-img-top" alt={pin.title}/>
        <div className="card-body">
          <h5 className="card-title">{pin.title}</h5>
          <button className="btn btn-danger" onClick={this.deletePinEvent}>Delete Pin</button>
        </div>
      </div>
    );
  }
}

export default Pin;
