import React from 'react';

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

  render() {
    const { board } = this.state;
    return (
      <div className="SingleBoard">
        <h1>{board.name}</h1>
        <p>{board.description}</p>
          <div className="pins d-flex flex-wrap justify-content-around">
            { this.state.pins.map((pin) => <Pin key={pin.id} pin={pin} />)}
          </div>
      </div>
    );
  }
}

export default SingleBoard;
