import {
  USER_CHECK_SESSION_BEGIN,
  USER_CHECK_SESSION_SUCCESS,
  USER_CHECK_SESSION_FAILURE,
  USER_CHECK_SESSION_DISMISS_ERROR,
} from './constants';
import Constants from '../../../constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function checkSession(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: USER_CHECK_SESSION_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const url = `${Constants.BASE_URL}/session`;
      const token = localStorage.getItem("token");
      const doRequest = new Promise((resolve2, reject2) => {
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })
        .then(res => resolve2(res.json())).catch(res => reject2(res));
      });
      doRequest.then(
        (res) => {
          dispatch({
            type: USER_CHECK_SESSION_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: USER_CHECK_SESSION_FAILURE,
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
export function dismissCheckSessionError() {
  return {
    type: USER_CHECK_SESSION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_CHECK_SESSION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        checkSessionPending: true,
        checkSessionError: null,
      };

    case USER_CHECK_SESSION_SUCCESS:
      const { currentUser } = action.data;
      // The request is success
      return {
        ...state,
        currentUser,
        sessionChecked: true,
        checkSessionPending: false,
        checkSessionError: null,
      };

    case USER_CHECK_SESSION_FAILURE:
      // The request is failed
      return {
        ...state,
        sessionChecked: true,
        checkSessionPending: false,
        checkSessionError: action.data.error,
      };

    case USER_CHECK_SESSION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        checkSessionError: null,
      };

    default:
      return state;
  }
}
