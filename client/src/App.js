import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import Flash from './layout/Flash.js';
import Footer from './layout/Footer.js'
import Home from './Home.js';
import Login from './auth/Login.js';
import Nav from './layout/Nav.js'
import Profile from './Profile.js';
import Signup from './auth/Signup.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: '',
      user: null,
      flashType: '',
      flash: ''
    }
  }

  componentDidMount = () => {
    this.loadUser();
  }

  loadUser = () => {
    console.log('loading user...');
    const token = localStorage.getItem('mernToken');
    if(token){
      console.log('valid token', token);
      //use axios to get token
      axios.post('/auth/me/from/token', {
        // pass in the token
        token: token
      }).then(result => {
        console.log('Success', result);
        //TODO: If valid user object is return, assign it to the state of user
        if(result){
          // User was found
          localStorage.setItem('mernToken', result.data.token);
          this.setState({
            token: result.data.token,
            user: result.data.user
          });
        } 
        else {
          //Nothing returned - clear the object
          localStorage.removeItem('mernToken');
          this.setState({
            token: '',
            user: null
          });
        }
      }).catch(error => {
        console.log('Error', error);
        localStorage.removeItem('mernToken');
        this.setState({
            token: '',
            user: null
          });
      });
    } 
    else {
      console.log('No Token')
      this.setState({
        token: '',
        user: ''
      });
    }
  }

  setFlash = (t,m) => {
    this.setState({
      flashType: t,
      flash: m
    })
  }

  cancelFlash = () => {
    this.setState({
      flashType: '',
      flash: ''
    })
  }

  render() {
    return (
      <div className="App">
      <Router>
        <div>
            <Nav user={this.state.user} updateUser={this.loadUser} />
            <Flash flashType={this.state.flashType} flash={this.state.flash} cancelFlash={this.cancelFlash} />
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={
                () => (<Signup user={this.state.user} updateUser={this.loadUser} setFlash={this.setFlash} />)
              } />
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
