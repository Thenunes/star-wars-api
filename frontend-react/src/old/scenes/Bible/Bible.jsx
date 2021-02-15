import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Sidebar from './components/Sidebar/Sidebar.js';
import './css/Article.css';

const bible = props => {

	const { version, book, chapter } = props;
	const [initied, setInitied] = useState(false);

	useEffect(() => {
		if(version != null && book != null && chapter)
			props.onFetchVerses(version.code, book.code, chapter);

	}, [version, book, chapter]);

	if(!initied){
		setInitied(true);
		props.onInitBible(props.versionDefault, props.bookDefault, props.chapterDefault);
	}

	if(props.ready)
		return (
			<div className="article bible-page">
				<div className="article__content">
					<div className="article__section article__section--inset">
						<h1 className="article__heading">
							{book.getName(props.language)} {props.chapter}
						</h1>
					</div>
					<div className="article__section article__section--inset">
						{props.list.map((section, iParagraph) => 
							<p key={"paragraph_"+iParagraph}>
								{section.map(verse => 
									<span className="verse" key={"paragraph_"+iParagraph+"_verse_"+verse.id}>
										<sup>
											{/* <span className="verse-action">
												 <span className="verse-action-bolt">
													<i class="fas fa-bolt bolt-icon"></i>
													<i class="fas fa-bolt bolt-icon bolt-icon--inactive"></i>
												</span> 
											</span> */}
											<span className="verse-number">{verse.number}</span>
										</sup>
										{verse.text}
									</span>
								)}
							</p>
						)}
					</div>
					<Sidebar />
				</div>
			</div>
		);

	return (
			<div className="article bible-page">
				<div className="article__content">
					<div className="article__section article__section--inset">
						<h1 className="article__heading skeleton-text-shell skeleton-bg-color">
							XXXXXXXXX
						</h1>
					</div>
					<div className="article__section article__section--inset">
						<p key="verse_skeleton_1" className="skeleton-text-shell skeleton-bg-color">
							XXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXX XXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX 
						</p>

						<p key="verse_skeleton_2" className="skeleton-text-shell skeleton-bg-color">
							XXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXX XXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX 
						</p>

						<p key="verse_skeleton_3" className="skeleton-text-shell skeleton-bg-color">
							XXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXX XXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXX
						</p>
						<p key="verse_skeleton_4" className="skeleton-text-shell skeleton-bg-color">

							XXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXX XXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXX XXXXXXX XXXXX XXXXXX XXXXXXXXX XXXXXXXXXX XXXXX XXXXX
						</p>
					</div>
					
					<Sidebar />
				</div>
			</div>
		);
}

const mapStateToProps = state => {
	return {
		language: state.app.language,
		ready: state.bible.verses.ready,
		loading: state.bible.verses.loading.status,
		error: state.bible.verses.loading.error,
		list: state.bible.verses.data,

		version: state.bible.version != null ? state.bible.version.data : null,
		book: state.bible.book != null ? state.bible.book.data : null,
		chapter: state.bible.chapter,
		
		versionDefault: state.bible.versionDefault,
		bookDefault: state.bible.bookDefault,
		chapterDefault: state.bible.chapterDefault,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchVerses: (version, book, chapter) => dispatch(actions.fetchBibleVerses(version, book, chapter)),
		onInitBible: (version, book, chapter) => {
			dispatch(actions.fetchBibleVersion(version));
			dispatch(actions.fetchBibleBook(book));
			dispatch(actions.setBibleChapter(chapter));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(bible);