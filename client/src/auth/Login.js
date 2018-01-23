import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name] : e.target.value });
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		console.log('form was submitted!');
		//TODO: Use axios to call serer and attempt to login
		//NOTE: Expect to receive a token back from server on success
		//NOTE: Make sure to handle error messages on failure
		//TODO: Redirect to profile?
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<div>
					<label>Email: </label>
					<input type="text" name="email" placeholder= "Your Email" value={this.state.email} onChange = {this.handleChange} />
				</div>
				<div>
					<label>Password: </label>
					<input type="password" name="password" placeholder = "Enter Password" value={this.state.password} onChange = {this.handleChange} />
				</div>
				<input type="submit" value="Login" className= "btn" />
			</form>
		);
	}
}

export default Login;