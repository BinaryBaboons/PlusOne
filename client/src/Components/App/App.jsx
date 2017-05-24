import React from 'react';
import { render } from 'react-dom';
import UserProfile from '../User/UserProfile.jsx';
import MenuBar from '../Menu/MenuBar.jsx';
import css from './app.css';
import {Route, Router} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <div>
          <MenuBar />
          <h1>+One</h1>
        </div>
      </div>
    );
  }
}

export default App;
