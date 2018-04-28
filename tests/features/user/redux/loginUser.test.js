import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  USER_LOGIN_USER_BEGIN,
  USER_LOGIN_USER_SUCCESS,
  USER_LOGIN_USER_FAILURE,
  USER_LOGIN_USER_DISMISS_ERROR,
} from '../../../../src/features/user/redux/constants';

import {
  loginUser,
  dismissLoginUserError,
  reducer,
} from '../../../../src/features/user/redux/loginUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user/redux/loginUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loginUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loginUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USER_LOGIN_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', USER_LOGIN_USER_SUCCESS);
      });
  });

  it('dispatches failure action when loginUser fails', () => {
    const store = mockStore({});

    return store.dispatch(loginUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USER_LOGIN_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', USER_LOGIN_USER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoginUserError', () => {
    const expectedAction = {
      type: USER_LOGIN_USER_DISMISS_ERROR,
    };
    expect(dismissLoginUserError()).toEqual(expectedAction);
  });

  it('handles action type USER_LOGIN_USER_BEGIN correctly', () => {
    const prevState = { loginUserPending: false };
    const state = reducer(
      prevState,
      { type: USER_LOGIN_USER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginUserPending).toBe(true);
  });

  it('handles action type USER_LOGIN_USER_SUCCESS correctly', () => {
    const prevState = { loginUserPending: true };
    const state = reducer(
      prevState,
      { type: USER_LOGIN_USER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginUserPending).toBe(false);
  });

  it('handles action type USER_LOGIN_USER_FAILURE correctly', () => {
    const prevState = { loginUserPending: true };
    const state = reducer(
      prevState,
      { type: USER_LOGIN_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginUserPending).toBe(false);
    expect(state.loginUserError).toEqual(expect.anything());
  });

  it('handles action type USER_LOGIN_USER_DISMISS_ERROR correctly', () => {
    const prevState = { loginUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USER_LOGIN_USER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginUserError).toBe(null);
  });
});

