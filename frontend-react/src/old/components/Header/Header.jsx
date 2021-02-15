import React, { Component } from 'react';
//import { BrowserRouter } from 'react-router-dom'
import './css/Header.css';

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="header">
				<div className="header__content">
					<div className="header__logo">
						<img src="https://dma9sdczpu5q0.cloudfront.net/media/Brand/tbp-logo-blue.png?q=65&fit=max&w=600" alt="Logo"/>
					</div>
					<div className="header__menu">
						Alex Nunes
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
