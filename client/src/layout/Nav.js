import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout.js'
import logo from '../logo.svg';

class Nav extends Component {
	render() {
		let links = <span />;
		if(this.props.user){
			links = (
				<span>
				<Link to="/profile">Profile</Link>
				<Logout updateUser={this.props.updateUser} />
				</span>);
		} else {
			links = (
				<span>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
				</span>
				);
		}

		return(
			<div>
				<nav className="nav">
				<Link to="/">Home</Link>
				{links}
				</nav>
				<header className="App-header">
		        	<img src={logo} className="App-logo" alt="logo" />
		        	<h1 className="App-title">Welcome to React</h1>
		        </header>
			</div>
		);
	}
}

export default Nav;