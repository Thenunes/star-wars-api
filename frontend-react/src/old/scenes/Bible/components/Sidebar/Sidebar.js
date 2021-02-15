import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import SidebarVersion from './components/SidebarVersion/SidebarVersion.jsx';
import SidebarBook from './components/SidebarBook/SidebarBook.jsx';
import SidebarChapter from './components/SidebarChapter/SidebarChapter.jsx';


const sidebar = props => {

	const [sidebarContent, setSidebarContent] = useState(null);
	const [sidebarList] = useState({
		'sidebar_version': {
			component: SidebarVersion,
			icon: 'fa-font',
			description: 'Version'
		},
		'sidebar_book': {
			component: SidebarBook,
			icon: 'fa-book',
			description: 'Book'
		},
		'sidebar_chapter': {
			component: SidebarChapter,
			icon: 'fa-list-ol',
			description: 'Chapter'
		}
	});

	const openSidebarItem = (itemId) => {
	
		props.onOpenSidebarItem(itemId);
	};

	const closeSidebar = () => {
		props.onCloseSidebar();

		if(sidebarContent !== null)
			setSidebarContent(null);
	}

	const sidebarElementsList = [];
	for(let index in sidebarList){
		sidebarElementsList.push({
			id: index,
			config: sidebarList[index]
		});
	}

	let sidebarElements = sidebarElementsList.map((sidebarElement) => {
		let Component = sidebarElement.config.component;

		return (<Component
			key = {sidebarElement.id}
			icon = {sidebarElement.config.icon}
			description = {sidebarElement.config.description}
			active = {props.activeItem === sidebarElement.id}
			onOpen = {() => openSidebarItem(sidebarElement.id)}
			onSetContent = {(content) => setSidebarContent(content)}
		/>);
	});

	if(!props.isOpenOverlay && props.isOpen)
		closeSidebar();

	return (
		<div className={"article__sidebar article-sidebar "+(props.isOpen ? 'active' : '') } >
			<div className="article-sidebar__list">
				<ul>
					{sidebarElements}
				</ul>  
			</div>
			<div className="article-sidebar__content">
				{sidebarContent}
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		isOpenOverlay: state.app.isOpenOverlay,
		isOpen: state.bible.sidebar.activeItem != null,
		activeItem: state.bible.sidebar.activeItem
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOpenSidebarItem: (item) => {
			dispatch(actions.openAppOverlay());
			dispatch(actions.openBibleSidebarItem(item));
		},
		onCloseSidebar: () => {
			dispatch(actions.closeAppOverlay());
			dispatch(actions.closeBibleSidebar());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(sidebar);