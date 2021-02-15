import BibleApi from '../../services/BibleApi';

import * as actionTypes from './actionTypes';

export const openBibleSidebarItem = (item) => {
    return {
        type: actionTypes.OPEN_BIBLE_SIDEBAR_ITEM,
        item: item
    };
};

export const closeBibleSidebar = () => {
    return {
        type: actionTypes.CLOSE_BIBLE_SIDEBAR
    };
};

//VERSIONS
export const fetchBibleVersionsStart = () => {
    return {
        type: actionTypes.FETCH_BIBLE_VERSIONS_START
    };
};

export const fetchBibleVersionsSuccess = data => {
    return {
        type: actionTypes.FETCH_BIBLE_VERSIONS_SUCCESS,
        data: data
    };
};

export const fetchBibleVersionsFail = (error = null) => {
    return {
        type: actionTypes.FETCH_BIBLE_VERSIONS_FAIL,
        error: error
    };
};

export const fetchBibleVersions = () => {
    return dispatch => {

        dispatch(fetchBibleVersionsStart());
        Promise.all([
            BibleApi.Version.getList(),
            BibleApi.Language.getList()
        ])
        .then(results => {
            let versionList = results[0];
            let languageList = results[1];

            let processedList = [];
            for(let index in languageList.results){

                let language = languageList.results[index];
                let languageVersions = versionList.results.filter(version => {
                    return version.language.code === language.code;
                });

                if(languageVersions.length > 0)
                    processedList.push({
                        id: language.id,
                        code: language.code,
                        name: language.name,
                        versions: languageVersions
                    });
            }

            return processedList;
        })
        .then(data => {
            dispatch(fetchBibleVersionsSuccess(data));
        })
        .catch(err => {
            if(err.response)
                dispatch(fetchBibleVersionsFail(err.response.data.error));
            else
                dispatch(fetchBibleVersionsFail('The connection to the server failed'));
        });
    };
};

// SINGLE
export const fetchBibleVersionStart = () => {
    return {
        type: actionTypes.FETCH_BIBLE_VERSION_START
    };
};

export const fetchBibleVersionSuccess = data => {
    return {
        type: actionTypes.FETCH_BIBLE_VERSION_SUCCESS,
        data: data
    };
};

export const fetchBibleVersionFail = (error = null) => {
    return {
        type: actionTypes.FETCH_BIBLE_VERSION_FAIL,
        error: error
    };
};

export const fetchBibleVersion = idOrCode => {
    return dispatch => {

        dispatch(fetchBibleVersionStart());
        BibleApi.Version.find(idOrCode)
            .then(data => {
                dispatch(fetchBibleVersionSuccess(data));
            })
            .catch(err => {
                if(err.response)
                    dispatch(fetchBibleVersionFail(err.response.data.error));
                else
                    dispatch(fetchBibleVersionFail('The connection to the server failed'));
            });
    };
};

// BOOKS
export const fetchBibleBooksStart = () => {
    return {
        type: actionTypes.FETCH_BIBLE_BOOKS_START
    };
};

export const fetchBibleBooksSuccess = data => {
    return {
        type: actionTypes.FETCH_BIBLE_BOOKS_SUCCESS,
        data: data
    };
};

export const fetchBibleBooksFail = (error = null) => {
    return {
        type: actionTypes.FETCH_BIBLE_BOOKS_FAIL,
        error: error
    };
};

export const fetchBibleBooks = () => {

    return dispatch => {

        dispatch(fetchBibleBooksStart());
        Promise.all([
            BibleApi.Testament.getList(),
            BibleApi.Book.getList()
        ])
        .then(results => {
            let testamentList = results[0];
            let bookList = results[1];

            for (let index in testamentList.results) {
                let testament = testamentList.results[index];

                testament.books = bookList.results.filter(book => {
                    return book.testament.code === testament.code;
                });
            }
            return testamentList.results;
        })
        .then(data => {
            dispatch(fetchBibleBooksSuccess(data));
        })
        .catch(err => {
            if(err.response)
                dispatch(fetchBibleBooksFail(err.response.data.error));
            else
                dispatch(fetchBibleBooksFail('The connection to the server failed'));
        });
    };
};


export const fetchBibleBookStart = () => {
    return {
        type: actionTypes.FETCH_BIBLE_BOOK_START
    };
};

export const fetchBibleBookSuccess = data => {
    return {
        type: actionTypes.FETCH_BIBLE_BOOK_SUCCESS,
        data: data
    };
};

export const fetchBibleBookFail = (error = null) => {
    return {
        type: actionTypes.FETCH_BIBLE_BOOK_FAIL,
        error: error
    };
};

export const fetchBibleBook = idOrCode => {

    return dispatch => {

        dispatch(fetchBibleBookStart());
        BibleApi.Book.find(idOrCode)
            .then(data => {
                dispatch(fetchBibleBookSuccess(data));
            })
            .catch(err => {
                if(err.response)
                    dispatch(fetchBibleBookFail(err.response.data.error));
                else
                    dispatch(fetchBibleBookFail('The connection to the server failed'));
            });
    };
};

// CHAPTER
export const setBibleChapter = chapter => {
    return {
        type: actionTypes.SET_BIBLE_CHAPTER,
        chapter: chapter
    };
};

// MILESTONES
export const fetchBibleMilestonesStart = () => {
    return {
        type: actionTypes.FETCH_BIBLE_MILESTONES_START
    };
};

export const fetchBibleMilestonesSuccess = data => {
    return {
        type: actionTypes.FETCH_BIBLE_MILESTONES_SUCCESS,
        data: data
    };
};

export const fetchBibleMilestonesFail = (error = null) => {
    return {
        type: actionTypes.FETCH_BIBLE_MILESTONES_FAIL,
        error: error
    };
};

export const fetchBibleMilestones = (book, language) => {
    return dispatch => {

        dispatch(fetchBibleMilestonesStart());
        BibleApi.Milestone.getList(book, language)
            .then(list => list.results)
            .then(data => {
                dispatch(fetchBibleMilestonesSuccess(data));
            })
            .catch(err => {
                if(err.response)
                    dispatch(fetchBibleMilestonesFail(err.response.data.error));
                else
                    dispatch(fetchBibleMilestonesFail('The connection to the server failed'));
            });
    };
};

// VERSES
export const fetchBibleVersesStart = () => {
    return {
        type: actionTypes.FETCH_BIBLE_VERSES_START
    };
};

export const setLoadingBibleVersesProgress = progress => {
    return {
        type: actionTypes.SET_LOADING_BIBLE_VERSES_PROGRESS,
        progress: progress
    };
};

export const fetchBibleVersesSuccess = data => {
    return {
        type: actionTypes.FETCH_BIBLE_VERSES_SUCCESS,
        data: data
    };
};

export const fetchBibleVersesFail = (error = null) => {
    return {
        type: actionTypes.FETCH_BIBLE_VERSES_FAIL,
        error: error
    };
};

export const fetchBibleVerses = (version, book, chapter) => {
    return dispatch => {

        dispatch(fetchBibleVersesStart());
        BibleApi.Verse.getList(version, book, chapter)
            .then(list => {

                let processedList = [];
                let paragraph = [];
                for(let index in list.results){
                    let verse = list.results[index];

                    if(verse.paragraph === 1 && paragraph.length > 0){
                        processedList.push(paragraph);
                        paragraph = [];
                    }

                    paragraph.push(verse);
                }

               processedList.push(paragraph);
               return processedList;
            })
            .then(data => {
                dispatch(fetchBibleVersesSuccess(data));
            })
            .catch(err => {
                if(err.response)
                    dispatch(fetchBibleVersesFail(err.response.data.error));
                else
                    dispatch(fetchBibleVersesFail('The connection to the server failed'));
            });
    };
};