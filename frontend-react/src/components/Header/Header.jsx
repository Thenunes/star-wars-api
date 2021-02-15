import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import * as actions from '../../store/actions/index';
import './css/Header.css';

import HeaderSearch from './components/HeaderSearch/HeaderSearch.jsx';

const Header = props => {
	
	const history = useHistory();

	const redirectHome = () => {
		history.push("/");
	};

	return (
		<div className="header">
			<div className="module_menu">
				<div className="logo">
					<img src={require("./img/star-wars-logo.png")} alt="Logo" onClick={() => redirectHome()} />
				</div>
			</div>
			<div className="right_menu">
				<HeaderSearch />
				<button type="button" className="btn" onClick={() => redirectHome()}>
					Ver Coleção
				</button>
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
)(Header);