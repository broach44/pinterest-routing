import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Boards</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/board/new">New Board</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={this.logMeOut}>Logout</button>
            </li>
          </ul>
        );
      }
      return (<ul className="navbar-nav ml-auto"></ul>);
    };
    return (
      <div className="MyNavbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Pinterest</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            { buildNavbar() }
          </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default MyNavbar;
