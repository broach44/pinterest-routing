import React from 'react';

import authData from '../../../helpers/data/authData';

import './PinForm.scss';
import pinData from '../../../helpers/data/pinData';

class PinForm extends React.Component {
  state = {
    pinImage: '',
    pinTitle: '',
  }

  componentDidMount() {
    const { pinId } = this.props.match.params;
    if (pinId) {
      pinData.getSinglePin(pinId)
        .then((request) => {
          const pin = request.data;
          this.setState({ pinImage: pin.imageUrl, pinTitle: pin.title });
        })
        .catch((err) => console.error('err from getsinglepin', err));
    }
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ pinImage: e.target.value });
  }

  pinTitleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { boardId, pinId } = this.props.match.params;
    const newPinObj = {
      uid: authData.getUid(),
      boardId,
      imageUrl: this.state.pinImage,
      title: this.state.pinTitle,
    };
    pinData.updatePin(pinId, newPinObj)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('err from editPin', err));
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const newPinObj = {
      uid: authData.getUid(),
      boardId,
      imageUrl: this.state.pinImage,
      title: this.state.pinTitle,
    };
    pinData.savePin(newPinObj)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('err from savePin', err));
  }

  render() {
    const { pinTitle, pinImage } = this.state;
    const { pinId } = this.props.match.params;
    return (
      <div className="PinForm">
        <h1>Create a New Pin</h1>
        <form>
          <div className="form-group">
            <label htmlFor="pin-title">Pin Title</label>
            <input
              type="text"
              id="pin-title"
              className="form-control"
              placeholder="Enter Pin Title"
              value={pinTitle}
              onChange={this.pinTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pin-image">Pin Image Url</label>
            <input
              type="text"
              id="pin-image"
              className="form-control"
              placeholder="Enter Pin Image Url"
              value={pinImage}
              onChange={this.imageChange}
            />
          </div>
          {
            (pinId) ? <button className="btn btn-secondary" onClick={this.editPinEvent}>Edit</button>
              : <button className="btn btn-secondary" onClick={this.savePinEvent}>Save Changes</button>
          }
        </form>
      </div>
    );
  }
}

export default PinForm;
