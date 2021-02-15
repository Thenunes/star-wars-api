import React from 'react';
import { connect } from 'react-redux';
//import * as actions from '../../store/actions/index';

import './css/Home.css';
import Collection from '../../components/Collection/Collection.jsx';

const home = props => {

	return (
		<div className="container">
			<div className="content">
				<h1>Personagens Salvos</h1>
				<Collection />
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(home);