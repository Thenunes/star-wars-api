import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { NavLink } from 'react-router-dom';
//import { BrowserRouter } from 'react-router-dom'
//import './css/Home.css';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			errorMessage: '',
			user: {
				email: '',
				password: ''
			}
		};
	}

	handleSubmit = async event => {
		event.preventDefault();

		let user = this.state.user;
		this.setState({ isLoading: true });
		
		try {
			await Auth.signIn(user.email, user.password);
			this.props.userHasAuthenticated(true);
			this.props.history.push('/');
		} catch (e) {
			
			this.setState({ 
				isLoading: false,
				errorMessage: e.message
			});
		}
	};

	handleEmail = event => {
		let value = event.target.value;
		this.setState( prevState => ({
			user: {
				...prevState.user,
				email: value
			}
		}));
	}

	handlePassword = event => {
		let value = event.target.value;
		this.setState( prevState => ({
			user: {
				...prevState.user,
				password: value
			}
		}));
	}

	renderErrorMessage() {
	    let container;

	    if(typeof this.state.errorMessage === 'string' && this.state.errorMessage.length > 0) {
	      	container = (
	      		<p className="form__error">
					{this.state.errorMessage}
				</p>
	      	);
	    }
	      
	    return container;
	}

	render() {
		return (
			<div className="main-panel__table">
				<div className="main-panel__table-cell">
					<div className="main-panel__switch">
						<span className="main-panel__switch__text">
							Don't have an account?
						</span>
						<NavLink to="/signup" className="main-panel__switch__button">
							Get Started
						</NavLink>
					</div>
					<div className="main-panel__content">
						
						<h1 className="main-panel__heading">
							Sign in to Bible.
							<small className="main-panel__subheading">
								Enter your details below.
							</small>
						</h1>
							
						<form className="main-panel__form" onSubmit={this.handleSubmit}>
							{this.renderErrorMessage()}
							
							<div className="form__group">
								<label htmlFor="emailAddress" className="form__label">Email Address</label>
								<input id="emailAddress" type="email" name="email" className="form__input" placeholder="julie@widgetco.com" autoFocus="" onChange={this.handleEmail} required/>
							</div>

							<div className="form__group">
								<label htmlFor="password" className="form__label">Password</label>
								<input id="password" type="password" className="form__input" name="password" placeholder="Enter your password" onChange={this.handlePassword} required/>
								<a href="/d/password/requestReset?redir=" className="form__help">Forgot password?</a>
							</div>

							<div className="text--center">
								<button className="form__button">Sign in</button>
							</div>
						</form>
					</div>

				</div>
			</div>
		);
	}
}

export default Login;
