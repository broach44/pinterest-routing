import React from 'react';

import './BoardForm.scss';
import authData from '../../../helpers/data/authData';
import boardData from '../../../helpers/data/boardData';

class BoardForm extends React.Component {
  state = {
    boardName: '',
    boardDescription: '',
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    if (boardId) {
      boardData.getSingleBoard(boardId)
        .then((response) => {
          this.setState({ boardName: response.data.name, boardDescription: response.data.description });
        })
        .catch((errFromGetSingleBoard) => console.error(errFromGetSingleBoard));
    }
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  setBoardToEdit = () => {

  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const newBoardObj = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      uid: authData.getUid(),
    };
    boardData.saveBoard(newBoardObj)
      .then(() => this.props.history.push('/'))
      .catch((err) => console.error('error from save board', err));
  }

  render() {
    const { boardName, boardDescription } = this.state;
    return (
      <div className="BoardForm">
        <form>
          <div className="form-group">
            <label htmlFor="board-name">Board Name</label>
            <input
              type="text"
              id="board-name"
              className="form-control"
              placeholder="Enter board name"
              value={boardName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="board-description">Board Description</label>
            <input
              type="text"
              id="board-description"
              className="form-control"
              placeholder="Enter board description"
              value={boardDescription}
              onChange={this.descriptionChange}
            />
          </div>
          <button className="btn btn-secondary" onClick={this.saveBoardEvent}>Save Changes</button>
        </form>
      </div>
    );
  }
}

export default BoardForm;
