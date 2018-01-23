import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Footer from './layout/Footer.js'
import Home from './Home.js'
import Login from './auth/Login.js';
import Nav from './layout/Nav.js'
import Profile from './Profile.js';
import Signup from './auth/Signup.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
            <Nav />
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile" component={Profile} />
            </div>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
