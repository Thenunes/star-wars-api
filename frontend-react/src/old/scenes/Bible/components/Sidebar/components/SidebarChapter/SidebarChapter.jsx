import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../../store/actions/index';

const sidebarChapter = props => {

	useEffect(() => {
		if(props.active)
			props.onSetContent(getContent());

	}, [props.active, props.loading, props.list]);

	useEffect(() => {
		
		if(props.active && (props.book.ready || !props.ready))
			props.onFetchChapters(props.book.data.code, props.language);
		
	}, [props.book.ready, props.active]);

	const renderChapterList = (list, language) => {

		let items = [];
		for(let index in list){
			let item = list[index];

			items.push(
				<li key={"chapter_"+item.code} className="article-sidebar__content__list__item" onClick={() => props.onSetChapter(item.number)}>
			  		<a>
			  			<div className="article-sidebar__content__item">
				  			<h3>{item.number}</h3>
				  		</div>
				  	</a>
			  	</li>
			);
		}

		for (let i = 0; i < 8; i++) 
			items.push(<li key={"chapter_placeholer_"+i} className="article-sidebar__content__list__item--placeholder"></li>);

		return items;
	}

	const renderList = (list, language) => {
		console.log(list);
		let items = [];
		for(let index in list){
			let item = list[index];

			items.push(<section className="article-sidebar__section" key={"milestone_"+item.id}>
				{item.code !== "all" ? (
					<h5 className="article-sidebar__section__header">{item.getTitle(language)}</h5>
			    ) : null}
				<h5 className="article-sidebar__section__header">{item.title}</h5>
				<ul className="article-sidebar__content__list article-sidebar__content__list--box article-sidebar__content__list--small-box">
					{renderChapterList(item.chapters, language)}
				</ul>  
			</section>);
		}

		return items;
	}

	const getContent = () => {

		if(props.loading || props.list == null){

			let skeletonList = [];
			for (let i = 0; i < 30; i++) {
				
				skeletonList.push(<li key={"chapter_skeleton_"+i} className="article-sidebar__content__list__item"></li>);
			}

			for (let i = 30; i < 38; i++) 
				skeletonList.push(<li key={"chapter_skeleton_"+i} className="article-sidebar__content__list__item--placeholder"></li>);

			return (
				<React.Fragment>
					<h1 className="skeleton-text-shell skeleton-bg-color">XXXXXXXX</h1>
					<section className="article-sidebar__section" key={"milestone_skeleton_1"}>
						<h5 className="article-sidebar__section__header skeleton-text-shell skeleton-bg-color">XXXXXXXXXXXXX</h5>
						<ul className="article-sidebar__content__list article-sidebar__content__list--box article-sidebar__content__list--small-box">
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
 					{renderList(props.list, props.language)}
 				</React.Fragment>
			);	
		}
	};

	return (
		<li key="bible_sidebar_chapter"
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
		language: state.app.language,
		book: state.bible.book,
		ready: state.bible.milestones.ready,
		list: state.bible.milestones.data,
		loading: state.bible.milestones.loading,
		error: state.bible.milestones.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchChapters: (book, language) => dispatch(actions.fetchBibleMilestones(book, language)),
		onSetChapter: chapter => {
			dispatch(actions.setBibleChapter(chapter));
			dispatch(actions.closeBibleSidebar());
			dispatch(actions.closeAppOverlay());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(sidebarChapter);