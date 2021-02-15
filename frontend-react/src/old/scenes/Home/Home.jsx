import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AppliedRoute from '../../components/AppliedRoute.jsx';
import Bible from '../Bible/Bible.jsx';

import './css/Home.css';

class Home extends Component {

	render() {

		return this.renderUserHome();

		// if(this.props.isAuthenticated)
		// 	return this.renderUserHome();
		// else
		// 	return this.renderVisitorHome();
	}

	renderUserHome(){
		return (
			<div className="panel-wrapper">
				<Switch>
					<AppliedRoute path="/" component={Bible} props={this.props} />
				</Switch>
			</div>
		);
	}

	renderVisitorHome(){
		return (
			<div className="panel-wrapper">
				<div className="feature-panel">
				</div>
				<div className="main-panel">
					{/*{this.props.isAuthenticated ? (
						//'Ola'
					) : (
						//<Signup {...this.props} />
					)}*/}
					<Switch>
						<AppliedRoute path="/" exact component={Login} props={this.props} />
						<AppliedRoute path="/signup" exact component={Signup} props={this.props} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default Home;
