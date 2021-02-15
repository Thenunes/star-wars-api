import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    language: 'en',
    isOpenOverlay: false,
    loading: {
        status: false,
        initialProgress: 0.80,
        requestProgress: 0,
        progress: 0
    }
};

const openOverlay = (state, action) => {

    return updateObject( state, {
        isOpenOverlay: true
    });
};

const closeOverlay = (state, action) => {
    return updateObject( state, {
        isOpenOverlay: false
    });
};

const startLoading = (state, action) => {
    return updateObject( state, {
        loading: updateObject( state.loading, {
            status: true,
            requestProgress: 0,
            progress: state.loading.initialProgress
        })
    });
};

const setLoadingRequestProgress = (state, action) => {
    return updateObject( state, {
        loading: updateObject( state.loading, {
            status: true,
            requestProgress: action.progress,
            progress: ( state.loading.initialProgress + ((1 - state.loading.initialProgress)*action.progress) )
        })
    });
};

const endLoading = (state, action) => {
    return updateObject( state, {
        loading: updateObject( state.loading, {
            status: false,
            requestProgress: 0,
            progress: 0
        })
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.OPEN_APP_OVERLAY: return openOverlay(state,action);
        case actionTypes.CLOSE_APP_OVERLAY: return closeOverlay(state,action);
        case actionTypes.START_LOADING: return startLoading(state, action);
        case actionTypes.SET_LOADING_REQUEST_PROGRESS: return setLoadingRequestProgress(state, action);
        case actionTypes.END_LOADING: return endLoading(state, action);
        default:
            return state;
    }
};

export default reducer;