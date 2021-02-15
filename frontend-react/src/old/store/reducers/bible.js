import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    verses: {
        loading: {
            status: false,
            error: null,
            progress: 0
        },
        ready: false,
        data: null
    },
    version: {
        loading: false,
        ready: false,
        error: null,
        data: null
    },
    book: {
        loading: false,
        ready: false,
        error: null,
        data: null
    },
    chapter: null,

    versionDefault: "kjv",
    bookDefault: "genesis",
    chapterDefault: 1,

    sidebar: {
        activeItem: null
    },
    versions: {
        loading: false,
        ready: false,
        error: null,
        data: null
    },
    books: {
        loading: false,
        ready: false,
        error: null,
        data: null
    },
    milestones: {
        loading: false,
        ready: false,
        error: null,
        data: null
    }
};

const openSidebarItem = (state, action) => {

    return updateObject( state, {
        sidebar: updateObject( state.sidebar, {
            activeItem: action.item
        })
    });
};

const closeSidebar = (state, action) => {
    return updateObject( state, {
        sidebar: updateObject( state.sidebar, {
            activeItem: null
        })
    });
};

// VERSION
const fetchVersionsStart = ( state, action ) => {
    return updateObject( state, { 
        versions: updateObject( state.versions, {
            error: null, loading: true 
        })
    });
};

const fetchVersionsSuccess = (state, action) => {
    return updateObject( state, { 
        versions: updateObject( state.versions, {
            loading: false, 
            data: action.data
        })
    });
};

const fetchVersionsFail = ( state, action ) => {
    return updateObject( state, { 
        versions: updateObject( state.versions, {
            error: action.error, 
            loading: false 
        })
    });
};

// SINGLE
const fetchVersionStart = ( state, action ) => {
    return updateObject( state, { 
        version: updateObject( state.version, {
            error: null, loading: true, ready:false
        })
    });
};

const fetchVersionSuccess = (state, action) => {
    return updateObject( state, { 
        version: updateObject( state.version, {
            loading: false, 
            ready: true,
            data: action.data
        })
    });
};

const fetchVersionFail = ( state, action ) => {
    return updateObject( state, { 
        version: updateObject( state.version, {
            error: action.error, 
            loading: false 
        })
    });
};

// BOOK
const fetchBooksStart = ( state, action ) => {
    return updateObject( state, { 
        books: updateObject( state.books, {
            error: null, loading: true, ready: false
        })
    });
};

const fetchBooksSuccess = (state, action) => {
    return updateObject( state, { 
        books: updateObject( state.books, {
            loading: false, 
            ready: true,
            data: action.data
        })
    });
};

const fetchBooksFail = ( state, action ) => {
    return updateObject( state, { 
        books: updateObject( state.books, {
            error: action.error, 
            loading: false 
        })
    });
};

//SINGLE
const fetchBookStart = ( state, action ) => {
    return updateObject( state, { 
        book: updateObject( state.book, {
            error: null, loading: true, ready: false
        })
    });
};

const fetchBookSuccess = (state, action) => {
    return updateObject( state, { 
        book: updateObject( state.book, {
            loading: false, 
            ready: true,
            data: action.data
        })
    });
};

const fetchBookFail = ( state, action ) => {
    return updateObject( state, { 
        book: updateObject( state.book, {
            error: action.error, 
            loading: false 
        })
    });
};

// CHAPTER
const setBibleChapter = ( state, action ) => {
    return updateObject( state, { 
        chapter: action.chapter
    });
};

// MILESTONES
const fetchMilestonesStart = ( state, action ) => {
    return updateObject( state, { 
        milestones: updateObject( state.milestones, {
            error: null, loading: true, ready: false
        })
    });
};

const fetchMilestonesSuccess = (state, action) => {
    return updateObject( state, { 
        milestones: updateObject( state.milestones, {
            loading: false, 
            ready: true,
            data: action.data
        })
    });
};

const fetchMilestonesFail = ( state, action ) => {
    return updateObject( state, { 
        milestones: updateObject( state.milestones, {
            error: action.error, 
            loading: false 
        })
    });
};

// VERSES
const fetchVersesStart = ( state, action ) => {
    return updateObject( state, {
        verses: updateObject( state.verses, {
            loading: updateObject( state.verses.loading, {
                status: true,
                error: null,
                progress: 0
            })
        })
    });
};

const setLoadingVersesProgress = (state, action) => {
    return updateObject( state, {
        verses: updateObject( state.verses, {
            loading: updateObject( state.verses.loading, {
                status: true,
                progress: action.progress
            })
        })
    });
};

const fetchVersesSuccess = (state, action) => {
    return updateObject( state, {
        verses: updateObject( state.verses, {
            ready: true,
            data: action.data,
            loading: updateObject( state.verses.loading, {
                status: false,
                progress: 0
            })
        })
    });
};

const fetchVersesFail = ( state, action ) => {
    return updateObject( state, {
        verses: updateObject( state.verses, {
            loading: updateObject( state.verses.loading, {
                status: false,
                progress: 0,
                error: action.error, 
            })
        })
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_BIBLE_VERSION_START: return fetchVersionStart(state,action);
        case actionTypes.FETCH_BIBLE_VERSION_SUCCESS: return fetchVersionSuccess(state,action);
        case actionTypes.FETCH_BIBLE_VERSION_FAIL: return fetchVersionFail(state,action);

        case actionTypes.FETCH_BIBLE_BOOK_START: return fetchBookStart(state,action);
        case actionTypes.FETCH_BIBLE_BOOK_SUCCESS: return fetchBookSuccess(state,action);
        case actionTypes.FETCH_BIBLE_BOOK_FAIL: return fetchBookFail(state,action);

        case actionTypes.SET_BIBLE_CHAPTER: return setBibleChapter(state,action);

        case actionTypes.FETCH_BIBLE_VERSIONS_START: return fetchVersionsStart(state,action);
        case actionTypes.FETCH_BIBLE_VERSIONS_SUCCESS: return fetchVersionsSuccess(state,action);
        case actionTypes.FETCH_BIBLE_VERSIONS_FAIL: return fetchVersionsFail(state,action);

        case actionTypes.FETCH_BIBLE_BOOKS_START: return fetchBooksStart(state,action);
        case actionTypes.FETCH_BIBLE_BOOKS_SUCCESS: return fetchBooksSuccess(state,action);
        case actionTypes.FETCH_BIBLE_BOOKS_FAIL: return fetchBooksFail(state,action);

        case actionTypes.FETCH_BIBLE_MILESTONES_START: return fetchMilestonesStart(state,action);
        case actionTypes.FETCH_BIBLE_MILESTONES_SUCCESS: return fetchMilestonesSuccess(state,action);
        case actionTypes.FETCH_BIBLE_MILESTONES_FAIL: return fetchMilestonesFail(state,action);

        case actionTypes.FETCH_BIBLE_VERSES_START: return fetchVersesStart(state,action);
        case actionTypes.FETCH_BIBLE_VERSES_SUCCESS: return fetchVersesSuccess(state,action);
        case actionTypes.FETCH_BIBLE_VERSES_FAIL: return fetchVersesFail(state,action);
        case actionTypes.SET_LOADING_BIBLE_VERSES_PROGRESS: return setLoadingVersesProgress(state,action);
        
        case actionTypes.OPEN_BIBLE_SIDEBAR_ITEM: return openSidebarItem(state,action);
        case actionTypes.CLOSE_BIBLE_SIDEBAR: return closeSidebar(state,action);
        default:
            return state;
    }
};

export default reducer;