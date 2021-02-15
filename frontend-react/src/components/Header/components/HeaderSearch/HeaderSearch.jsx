import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import config from '../../../../config';
import axios from 'axios';
import './css/HeaderSearch.css';

const HeaderSearch = props => {

	const ref = useRef(null);
	const history = useHistory();
	const [isActive, setIsActive] = useState(false);
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [list, setList] = useState();
	const [cancelToken, setCancelToken] = useState();
	const [typing, setTyping] = useState(false);
	const [typingTimeout, setTypingTimeout] = useState(0);
	var regex = new RegExp(search.toLowerCase());

	// useEffect(() => {
	// 	getList();
	// }, [search]);

	useEffect(() => {
		if(isActive)
			document.addEventListener('mousedown', clickListener)

		return () => {
			document.removeEventListener('mousedown', clickListener)
		}
	}, [isActive]);

	const changeSearch = (string) => {
		setTyping(true);
		setSearch(string);

		if(typingTimeout)
			clearTimeout(typingTimeout);

		setTypingTimeout(setTimeout(function () {
       		getList(string);
       		setTyping(false);
        }, 300));
	};

	const getList = (string) => {
		if(!string)
			return;

		if(!isLoading)
			props.onStartLoading();

		setIsLoading(true);

		if (cancelToken)
			cancelToken.cancel();
		 
		let cancelTokenAux = axios.CancelToken.source();
		setCancelToken(cancelTokenAux);

		let url = config.app.apiUrl+'/person/list?search='+string;
		axios.get(url, {
			cancelToken: cancelTokenAux.token
		}).then(response => {

			if(response.data.data){
	  			setList(response.data.data);
	  			setIsActive(true);
			}
	  		else
	  			setList(false);

	  		props.onEndLoading();
	  		setIsLoading(false);

		}).catch(function(err){});
	};

	const clickListener = useCallback(
		(e: MouseEvent) => {
			if(!ref.current.contains(e.target))
				setIsActive(false);
		},
		[ref.current],
	);

	const redirectPerson = (apiId) => {
		history.push("/person/"+apiId);
		setIsActive(false);
	};

	const renderList = () => {

		let renderList = [];

		for(let index in list){

			let regexResult = regex.exec(list[index]['name'].toLowerCase());
			if(!regexResult)
				continue;

			renderList.push(
				<li 
					className={"header-search__item"}
					onClick={() => redirectPerson(list[index]['api_id'])}
					key={"header-search__item__"+list[index]['api_id']}
				>
					<span className="header-search__list__title">
						{list[index]['name'].substr(0, regexResult.index)}
						<span>
							{list[index]['name'].substr(regexResult.index, search.length)}
						</span>
						{list[index]['name'].substr(regexResult.index + search.length)}
					</span>
				</li>
			);
		}

		return (
			<ul className="header-search__list">
				{renderList}
			</ul>
		);
	}

	return (
		<div className="header-search" ref={ref}>
			<form>
				<i className="fas fa-search icon"></i>
				<input 
					type="text" id="header-search" name="search" autoComplete="off" value={search} 
					onChange={(e) => changeSearch(e.target.value)} 
					onClick={() => setIsActive(true)} 
				/>
			</form>	
			{isActive && search && !typing && list !== false && !isLoading && <div className="header-search__dropdown">
				<div className="header-search__content">
					{renderList()}
				</div>
			</div>}
		</div>
	);
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		onStartLoading: () => dispatch(actions.startLoading()),
		onEndLoading: () => dispatch(actions.endLoading()),
	};
};	

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderSearch);