import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as actions from '../../store/actions/index';
import config from '../../config';
import axios from 'axios';

import './css/Collection.css';

const collection = props => {

	const history = useHistory();
	const [list, setList] = useState(null);

	useEffect(() => {
		getCollectionList();
	}, []);

	const getCollectionList = () => {

		props.onStartLoading();
		let url = config.app.apiUrl+'/person/listSaved';
		axios.get(url).then(response => {
			
			if(response.data.data){
	  			setList(response.data.data);
			}
	  		else
	  			setList(false);

	  		props.onEndLoading();
		}).catch(function(err){});
	};

	const deleteItem = (apiId) => {
		props.onStartLoading();
		let url = config.app.apiUrl+'/person/delete/'+apiId;
		axios.delete(url).then(response => {
			
			if(response.data.data){
	  			setList(response.data.data);
			}
	  		else
	  			setList(false);

	  		props.onEndLoading();
		}).catch(function(err){ props.onEndLoading(); });
	};

	const redirectPerson = (apiId) => {
		history.push("/person/"+apiId);
	};

	const renderList = () => {

		let renderList = [];
		for(let index in list)
		{
			renderList.push(
				<li className="list__item" key={list[index]['api_id']}>
					<span className="list__item__title">
						{list[index]['name']}
					</span>
					<div className="list__actions">
						<button type="button" className="btn" onClick={() => redirectPerson(list[index]['api_id'])}>Ver Detalhes</button>
						<button type="button" className="btn btn--danger" onClick={() => deleteItem(list[index]['api_id'])}>Apagar</button>
					</div>
				</li>
			);
		}

		return renderList;
	}

	return (
		<ul className="header-search__list">
			{renderList()}
		</ul>
	);
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		onStartLoading: () => dispatch(actions.startLoading()),
		onEndLoading: () => dispatch(actions.endLoading())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(collection);