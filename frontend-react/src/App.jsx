import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AppliedRoute from './components/AppliedRoute.jsx';
//import * as actions from './store/actions/index';
import Home from './scenes/Home/Home.jsx';
import Person from './scenes/Person/Person.jsx';
import Header from './components/Header/Header.jsx';

import './css/index.css';

const app = props => {

	const { loading } = props;
	let loadingContent = (
		<div 
			className={"loading-bar "+(loading.status ? "loading-bar--active" : "")}
			style={{width: (loading.progress*100)+"%"}}
		> 
		</div>
	);

	return (
		<React.Fragment>
			<Header />
			<Switch>
				<AppliedRoute path="/" exact component={Home} />
				<AppliedRoute path="/person/:id" exact component={Person} />
			</Switch>
			{loadingContent}
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		loading: state.app.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(app);