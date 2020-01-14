import React from 'react';
import { Link } from 'react-router-dom';
import Pin from '../../shared/Pin/Pin';

import './SingleBoard.scss';
import boardData from '../../../helpers/data/boardData';
import pinData from '../../../helpers/data/pinData';

class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  }

  getPinData = (boardId) => {
    pinData.getPinsByBoardId(boardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((error) => console.error('err from get Pin by board id', error));
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    boardData.getSingleBoard(boardId)
      .then((response) => {
        this.setState({ board: response.data });
        this.getPinData(boardId);
      })
      .catch((errFromGetSingleBoard) => console.error(errFromGetSingleBoard));
  }

  deletePin = (pinId) => {
    const { boardId } = this.props.match.params;
    pinData.deletePin(pinId)
      .then(() => {
        this.getPinData(boardId);
      })
      .catch((error) => console.error('error from deletePin', error));
  }

  render() {
    const { board, pins } = this.state;
    const { boardId } = this.props.match.params;

    return (
      <div className="SingleBoard">
        <h1>{board.name}</h1>
        <p>{board.description}</p>
        <Link className="btn btn-dark" to={`/board/${boardId}/pin/new`}>Add a Pin</Link>
          <div className="pins d-flex flex-wrap justify-content-around">
            { pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin} />)}
          </div>
      </div>
    );
  }
}

export default SingleBoard;
