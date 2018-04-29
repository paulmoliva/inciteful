import axios from 'axios';
import {
  CATEGORIES_CREATE_CATEGORY_BEGIN,
  CATEGORIES_CREATE_CATEGORY_SUCCESS,
  CATEGORIES_CREATE_CATEGORY_FAILURE,
  CATEGORIES_CREATE_CATEGORY_DISMISS_ERROR,
} from './constants';
import Constants from '../../../constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function createCategory(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: CATEGORIES_CREATE_CATEGORY_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const url = `${Constants.BASE_URL}/categories`;
      const doRequest = axios.post(url, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: CATEGORIES_CREATE_CATEGORY_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: CATEGORIES_CREATE_CATEGORY_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissCreateCategoryError() {
  return {
    type: CATEGORIES_CREATE_CATEGORY_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CATEGORIES_CREATE_CATEGORY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createCategoryPending: true,
        createCategoryError: null,
      };

    case CATEGORIES_CREATE_CATEGORY_SUCCESS:
      // The request is success
      const { allCategories } = state;
      allCategories.push(action.data.data);
      return {
        ...state,
        allCategories,
        createCategoryPending: false,
        createCategoryError: null,
      };

    case CATEGORIES_CREATE_CATEGORY_FAILURE:
      // The request is failed
      return {
        ...state,
        createCategoryPending: false,
        createCategoryError: action.data.error,
      };

    case CATEGORIES_CREATE_CATEGORY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createCategoryError: null,
      };

    default:
      return state;
  }
}
