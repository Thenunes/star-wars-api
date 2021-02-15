import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../../store/actions/index';

const sidebarVersion = props => {

	useEffect(() => {
		if(props.active)
			props.onSetContent(getContent());

	}, [props.active, props.loading, props.list]);

	const getContent = () => {

		if(props.loading || props.list == null){

			let skeletonList = [];

			for (let i = 0; i < 5; i++) {
				skeletonList.push(
					<li key={"version_skeleton_"+i} className="skeleton-bg-color without-pseudo-elements"></li>
				);
			}

			return (
				<React.Fragment>
					<h1 className="skeleton-text-shell skeleton-bg-color">XXXXXXXX</h1>
					<section className="article-sidebar__section">
						<h5 className="article-sidebar__section__header skeleton-text-shell skeleton-bg-color">XXXXXXXXXXX</h5>
						<ul className="article-sidebar__content__list">
							{skeletonList}
						</ul>  
					</section>
				</React.Fragment>	
			);
		}
		else{
			return (
				<React.Fragment>
					<h1>{props.description}</h1>
					{props.list.map(language => 
						<section className="article-sidebar__section" key={'language_'+language.id}>
							<h5 className="article-sidebar__section__header">{language.name}</h5>
							<ul className="article-sidebar__content__list">
								{language.versions.map(version => 
									<li key={"version_"+version.id} onClick={() => props.onSetVersion(version.code)}>
								  		<a>
									  		<h3>{version.name}</h3>
									  		<p>{version.description}</p>
									  	</a>
								  	</li>
								)}
							</ul>  
						</section>
					)}
				</React.Fragment>
			);	
		}
	};

	if(props.active){
		if(!props.loading && props.list == null && props.error === null)
			props.onFetchVersions();
	}

	return (
		<li key="bible_sidebar_version"
			className={"article-sidebar__item "+(props.active ? 'active' : '')} 
			onClick={() => props.onOpen()}
		>
	  		<i className={"fas "+props.icon}></i>
	  		<span className="article-sidebar__description">{props.description}</span>
	  	</li>
	);
}

const mapStateToProps = state => {
	return {
		list: state.bible.versions.data,
		loading: state.bible.versions.loading,
		error: state.bible.versions.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchVersions: () => dispatch(actions.fetchBibleVersions()),
		onSetVersion: version => {
			dispatch(actions.fetchBibleVersion(version))
			dispatch(actions.openBibleSidebarItem("sidebar_book"))
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(sidebarVersion);
