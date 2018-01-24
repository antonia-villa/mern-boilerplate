import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Logout extends Component {
	handleLogout = (e) => {
		e.preventDefault();
		//TODO: Delete toke from the local storage
		localStorage.removeItem('merkToken');
		//TODO: back to home page
		this.props.updateUser();
	}
	render() {
		return (<Link to="/" onClick={this.handleLogout}>Logout</Link>
			);
	}
}

export default Logout;