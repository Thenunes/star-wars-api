import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { NavLink } from 'react-router-dom';
//import { BrowserRouter } from 'react-router-dom'
//import './css/Home.css';

class Singup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			coginitoUser: null,
			user: {
				email: '',
				name: '',
				password: '',
				confirmationCode: ''
			}
		};
	}

	validateForm() {
		return (
			this.state.email.length > 0 &&
			this.state.password.length > 8
		);
	}

	validateConfirmationForm() {
		return this.state.confirmationCode.length > 0;
	}

	handleSubmit = async event => {
		event.preventDefault();
		let user = this.state.user;
		this.setState({ isLoading: true });

		try {
			const coginitoUser = await Auth.signUp({
				username: user.email,
				password: user.password
			});
			this.setState({coginitoUser});
			
		} catch (e) {
			this.setState({ errorMessage: e.message });
		}

		this.setState({ isLoading: false });
	};

	handleConfirmationSubmit = async event => {
		event.preventDefault();
		let user = this.state.user;
		this.setState({ isLoading: true });

		try {
			await Auth.confirmSignUp(user.email, user.confirmationCode);
			await Auth.signIn(user.email, user.password);

			this.props.userHasAuthenticated(true);
			this.props.history.push('/');
		} catch (e) {

			this.setState({ 
				errorMessage: e.message,
				isLoading: false 
			});
		}
	};

	handleName = event => {
		let value = event.target.value;
		this.setState( prevState => ({
			user: {
				...prevState.user,
				name: value
			}
		}));
	}

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

	handleConfirmationCode = event => {
		let value = event.target.value;
		this.setState( prevState => ({
			user: {
				...prevState.user,
				confirmationCode: value
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

	renderConfirmation() {
		return (
			<div className="main-panel__table">
				<div className="main-panel__table-cell">
					<div className="main-panel__switch">
						<NavLink to="/" className="main-panel__switch__button">
							Back
						</NavLink>
					</div>
					<div className="main-panel__content">
						
						<h1 className="main-panel__heading">
							Just one more step.<br />
							Lets verify your email.
							<small className="main-panel__subheading">
								We already send a code to {this.state.user.email}, please check you inbox and insert code in form below to verify your email.
							</small>
						</h1>
							
						<form className="main-panel__form" onSubmit={this.handleConfirmationSubmit}>
							{this.renderErrorMessage()}

							<div className="form__group">
								<label htmlFor="emailAddress" className="form__label">Code</label>
								<input id="confirmation-code" type="text" name="confirmation-code" className="form__input" placeholder="XXXX-XXXX-XXXX-XX" autoFocus="" value="" onChange={this.handleConfirmationCode} />
							</div>

							<div className="text--center">
								<button className="form__button">Continue</button>
							</div>

							<small>
								Don´t worry. It´s only one time. Once yout email is verified you do not need to do this anymore :)
							</small>
						</form>
					</div>

				</div>
			</div>
		);
	}

	renderRegistration() {
		return (
			<div className="main-panel__table">
				<div className="main-panel__table-cell">
					<div className="main-panel__switch">
						<span className="main-panel__switch__text">
							Already have an account?
						</span>
						<NavLink to="/" className="main-panel__switch__button">
							Sign in
						</NavLink>
					</div>
					<div className="main-panel__content">
						
						<h1 className="main-panel__heading">
							Get started absolutely free
							<small className="main-panel__subheading">
								Free forever. No credit card needed.
							</small>
						</h1>
							
						<form className="main-panel__form" onSubmit={this.handleSubmit}>
							{this.renderErrorMessage()}

							<div className="form__group">
								<label htmlFor="emailAddress" className="form__label">Email Address</label>
								<input id="emailAddress" type="email" name="email" className="form__input" placeholder="julie@widgetco.com" autoFocus="" onChange={this.handleEmail} />
							</div>

							<div className="form__group">
								<label htmlFor="name" className="form__label">Name</label>
								<input id="name" className="form__input" name="name" placeholder="Julie" onChange={this.handleName} />
							</div>

							<div className="form__group">
								<label htmlFor="password" className="form__label">Password</label>
								<input id="password" type="password" className="form__input" name="password" placeholder="Enter your password" onChange={this.handlePassword} />
								<span className="form__help">8 or more characters</span>
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

	render() {
		return this.state.coginitoUser === null ? this.renderRegistration() : this.renderConfirmation();
	}
}

export default Singup;
