import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  USER_SIGN_UP_USER_BEGIN,
  USER_SIGN_UP_USER_SUCCESS,
  USER_SIGN_UP_USER_FAILURE,
  USER_SIGN_UP_USER_DISMISS_ERROR,
} from '../../../../src/features/user/redux/constants';

import {
  signUpUser,
  dismissSignUpUserError,
  reducer,
} from '../../../../src/features/user/redux/signUpUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user/redux/signUpUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when signUpUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(signUpUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USER_SIGN_UP_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', USER_SIGN_UP_USER_SUCCESS);
      });
  });

  it('dispatches failure action when signUpUser fails', () => {
    const store = mockStore({});

    return store.dispatch(signUpUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USER_SIGN_UP_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', USER_SIGN_UP_USER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSignUpUserError', () => {
    const expectedAction = {
      type: USER_SIGN_UP_USER_DISMISS_ERROR,
    };
    expect(dismissSignUpUserError()).toEqual(expectedAction);
  });

  it('handles action type USERS_SIGN_UP_USER_BEGIN correctly', () => {
    const prevState = { signUpUserPending: false };
    const state = reducer(
      prevState,
      { type: USER_SIGN_UP_USER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signUpUserPending).toBe(true);
  });

  it('handles action type USERS_SIGN_UP_USER_SUCCESS correctly', () => {
    const prevState = { signUpUserPending: true };
    const state = reducer(
      prevState,
      { type: USER_SIGN_UP_USER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signUpUserPending).toBe(false);
  });

  it('handles action type USERS_SIGN_UP_USER_FAILURE correctly', () => {
    const prevState = { signUpUserPending: true };
    const state = reducer(
      prevState,
      { type: USER_SIGN_UP_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signUpUserPending).toBe(false);
    expect(state.signUpUserError).toEqual(expect.anything());
  });

  it('handles action type USERS_SIGN_UP_USER_DISMISS_ERROR correctly', () => {
    const prevState = { signUpUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USER_SIGN_UP_USER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signUpUserError).toBe(null);
  });
});

