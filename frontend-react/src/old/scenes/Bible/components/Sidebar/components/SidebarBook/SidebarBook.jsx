import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../../store/actions/index';

const sidebarBook = props => {

	useEffect(() => {
		if(props.active)
			props.onSetContent(getContent());

	}, [props.active, props.loading, props.list]);

	const renderBookList = (list, language) => {

		let books = [];
		for(let index in list){
			let book = list[index];

			books.push(
				<li key={"book_"+book.id} className="article-sidebar__content__list__item" onClick={() => props.onSetBook(book.code)}>
			  		<a>
			  			<div className="article-sidebar__content__item">
				  			<h3>{book.getName(language)}</h3>
				  		</div>
				  	</a>
			  	</li>
			);
		}

		for (let i = 0; i < 3; i++) 
			books.push(<li key={"book_placeholer_"+i} className="article-sidebar__content__list__item--placeholder"></li>);

		return books;
	}

	const renderList = (list, language) => {

		let testaments = [];
		for(let index in list){
			let testament = list[index];

			testaments.push(<section className="article-sidebar__section" key={"testament_"+testament.id}>
				<h5 className="article-sidebar__section__header">{testament.getName(language)}</h5>
				<ul className="article-sidebar__content__list article-sidebar__content__list--box">
					{renderBookList(testament.books, language)}
				</ul>  
			</section>);
		}

		return testaments;
	}

	const getContent = () => {

		if(props.loading || props.data == null){

			let skeletonList = [];
			for (let i = 0; i < 12; i++) {
				
				skeletonList.push(<li key={"book_skeleton_"+i} className="article-sidebar__content__list__item"></li>);
			}

			return (
				<React.Fragment>
					<h1 className="skeleton-text-shell skeleton-bg-color">XXXXXXXX</h1>
					<section className="article-sidebar__section" key={"testament_skeleton_1"}>
						<h5 className="article-sidebar__section__header skeleton-text-shell skeleton-bg-color">XXXXXXXXXXXXX</h5>
						<ul className="article-sidebar__content__list article-sidebar__content__list--box">
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

	if(props.active){
		if(!props.loading && props.data == null && props.error === null)
			props.onFetchBooks();
	}

	return (
		<li key="bible_sidebar_book"
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
		data: state.bible.books.data,
		loading: state.bible.books.loading,
		error: state.bible.books.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchBooks: () => dispatch(actions.fetchBibleBooks()),
		onSetBook: book => {
			dispatch(actions.fetchBibleBook(book))
			dispatch(actions.openBibleSidebarItem("sidebar_chapter"))
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(sidebarBook);