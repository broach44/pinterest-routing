import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import boardShape from '../../../helpers/propz/boardShape';

import './Board.scss';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    deleteBoard: PropTypes.func,
  }

  deleteBoardEvent = (e) => {
    e.preventDefault();
    const { deleteBoard, board } = this.props;
    deleteBoard(board.id);
  }

  render() {
    const { board } = this.props;
    return (
      <div className="card col-4 board-card">
        <div className="card-body">
          <button className="btn btn-danger delete-btn" onClick={this.deleteBoardEvent}>X</button>
          <Link className="btn btn-secondary" to={`/board/${board.id}/edit`}>Edit</Link>
          <h5 className="card-title">{board.name}</h5>
          <p className="card-text">{board.description}</p>
          <Link className="btn btn-secondary" to={`/board/${board.id}`}>View Board</Link>
        </div>
      </div>
    );
  }
}

export default Board;
