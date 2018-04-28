// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  USER_LOG_OUT_USER,
} from './constants';

export function logOutUser() {
  return {
    type: USER_LOG_OUT_USER,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_LOG_OUT_USER:
      window.localStorage.removeItem("token");
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
}
