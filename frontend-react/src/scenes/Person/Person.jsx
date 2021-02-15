import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import config from '../../config';
import axios from 'axios';

import './css/Person.css';

const person = props => {

	const [data, setData] = useState(null);

	useEffect(() => {
		getDetails();
	}, [props.location.pathname]);

	const getDetails = () => {

		var regex = /^\/person\/(?<apiId>\d+)/gm;
		let regexResult = regex.exec(props.location.pathname);

		props.onStartLoading();
		let url = config.app.apiUrl+'/person/'+regexResult.groups.apiId;
		axios.get(url).then(response => {
			
			if(response.data.data)
	  			setData(response.data.data);

	  		props.onEndLoading();
		}).catch(function(err){ props.onEndLoading(); });
	};

	const saveItem = (apiId) => {
		props.onStartLoading();
		let url = config.app.apiUrl+'/person/save/'+apiId;
		axios.post(url).then(response => {
			
			setData(response.data.data);

	  		props.onEndLoading();
		}).catch(function(err){ props.onEndLoading(); });
	};

	const deleteItem = (apiId) => {
		props.onStartLoading();
		let url = config.app.apiUrl+'/person/delete/'+apiId;
		axios.delete(url).then(response => {
			
			let newData = data;
			newData.id = null;

			setData(newData);

	  		props.onEndLoading();
		}).catch(function(err){ props.onEndLoading(); });
	};

	const renderSave = () => {
		return (
			<React.Fragment>
				<div className="person__button">
					{data.id && <button type="button" className="btn btn--danger" onClick={() => deleteItem(data.api_id)}>Deletar</button>}
					{!data.id && <button type="button" className="btn btn--success" onClick={() => saveItem(data.api_id)}>Salvar</button>}
				</div>
			</React.Fragment>
		);
	};

	const renderFilm = (film) => {

		let date = new Date(film.release_date.date);
		let year = date.getFullYear();
		return (
			<React.Fragment key={film.api_id}>
				<span>{year} - {film.title}</span><br/>
			</React.Fragment>
		);
	};

	const renderDetails = () => {
		return (
			<React.Fragment>
				{renderSave()}
				<h1>{data.name}</h1>
				<br/>
				<h3><strong>Informações</strong></h3>
				<span>Altura: {data.height ? data.height : "desconhecido"}</span><br/>
				<span>Peso: {data.mass ? data.mass : "desconhecido"}</span><br/>
				{data.specie && <span>Espécie: {data.specie.name}</span>}
				<br/>
				<h3><strong>Filmes</strong></h3>
				{data.films && data.films.map(renderFilm)}
			</React.Fragment>
		);
	};

	return (
		<div className="container">
			<div className="content">
				{data != null && renderDetails()}
			</div>
		</div>
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
)(person);