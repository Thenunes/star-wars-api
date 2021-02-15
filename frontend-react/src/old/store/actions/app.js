import * as actionTypes from './actionTypes';

export const openAppOverlay = () => {
    return {
        type: actionTypes.OPEN_APP_OVERLAY
    };
};

export const closeAppOverlay = () => {
    return {
        type: actionTypes.CLOSE_APP_OVERLAY
    };
};

export const startLoading = () => {
    return {
        type: actionTypes.START_LOADING
    };
};

export const setLoadingRequestProgress = progress => {
    return {
        type: actionTypes.SET_LOADING_REQUEST_PROGRESS,
        progress: progress
    };
};

export const endLoading = () => {
    return {
        type: actionTypes.END_LOADING
    };
};