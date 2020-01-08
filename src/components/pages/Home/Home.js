import React from 'react';

import boardData from '../../../helpers/data/boardData';
import authData from '../../../helpers/data/authData';

import Board from '../../shared/Board/Board';

import './Home.scss';

class Home extends React.Component {
  state = {
    boards: [],
  }

  getBoards = () => {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((errFromGetBoards) => console.error(errFromGetBoards));
  }

  componentDidMount() {
    this.getBoards();
  }

  deleteBoard = (boardId) => {
    boardData.deleteBoard(boardId)
      .then(() => {
        this.getBoards();
      })
      .catch((error) => console.error('err from deleteBoard', error));
  }

  render() {
    return (
      <div className="Home">
        <h1>Home Page</h1>
        <div className="boards d-flex flex-wrap justify-content-around">
          {
            this.state.boards.map((board) => <Board key={board.id} board={board} deleteBoard={this.deleteBoard} />)
          }
        </div>
      </div>
    );
  }
}

export default Home;
