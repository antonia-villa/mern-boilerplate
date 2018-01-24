import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name] : e.target.value });
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		// As a test to see output of form, console.log(this.state)
		console.log('form was submitted!', this.state);
		//TODO: Use axios to call serer and attempt to login
		axios.post('/auth/signup',{
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}).then(result => {
			console.log('Response from server.', result);
			localStorage.setItem('mernToken', result.data.token);
			this.props.updateUser();
		}).catch(error => {
			console.log('server had an error', error);
			this.props.setFlash('error', error.response.status + ': ' + error.response.data.message);
		});
		//NOTE: Expect to receive a token back from server on success
		//NOTE: Make sure to handle error messages on failure
		//TODO: Redirect to profile?
	}

	render() {
		if(this.props.user){
			return (<Redirect to="/profile" />)
		} else {

		return (
				<form onSubmit={this.handleFormSubmit}>
					<div>
						<label>Email: </label>
						<input type="text" name="email" placeholder= "Your Email" value={this.state.email} onChange = {this.handleChange} />
					</div>
					<div>
						<label>Name: </label>
						<input type="text" name="name" placeholder= "Your Name" value={this.state.name} onChange = {this.handleChange} />
					</div>
					<div>
						<label>Password: </label>
						<input type="password" name="password" placeholder = "Enter Password" value={this.state.password} onChange = {this.handleChange} />
					</div>
					<input type="submit" value="Signup" className= "btn" />
				</form>

			);
		}
	}
}

export default Signup;