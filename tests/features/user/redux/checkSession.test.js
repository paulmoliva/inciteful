import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  USER_CHECK_SESSION_BEGIN,
  USER_CHECK_SESSION_SUCCESS,
  USER_CHECK_SESSION_FAILURE,
  USER_CHECK_SESSION_DISMISS_ERROR,
} from '../../../../src/features/user/redux/constants';

import {
  checkSession,
  dismissCheckSessionError,
  reducer,
} from '../../../../src/features/user/redux/checkSession';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user/redux/checkSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when checkSession succeeds', () => {
    const store = mockStore({});

    return store.dispatch(checkSession())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USER_CHECK_SESSION_BEGIN);
        expect(actions[1]).toHaveProperty('type', USER_CHECK_SESSION_SUCCESS);
      });
  });

  it('dispatches failure action when checkSession fails', () => {
    const store = mockStore({});

    return store.dispatch(checkSession({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USER_CHECK_SESSION_BEGIN);
        expect(actions[1]).toHaveProperty('type', USER_CHECK_SESSION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCheckSessionError', () => {
    const expectedAction = {
      type: USER_CHECK_SESSION_DISMISS_ERROR,
    };
    expect(dismissCheckSessionError()).toEqual(expectedAction);
  });

  it('handles action type USER_CHECK_SESSION_BEGIN correctly', () => {
    const prevState = { checkSessionPending: false };
    const state = reducer(
      prevState,
      { type: USER_CHECK_SESSION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkSessionPending).toBe(true);
  });

  it('handles action type USER_CHECK_SESSION_SUCCESS correctly', () => {
    const prevState = { checkSessionPending: true };
    const state = reducer(
      prevState,
      { type: USER_CHECK_SESSION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkSessionPending).toBe(false);
  });

  it('handles action type USER_CHECK_SESSION_FAILURE correctly', () => {
    const prevState = { checkSessionPending: true };
    const state = reducer(
      prevState,
      { type: USER_CHECK_SESSION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkSessionPending).toBe(false);
    expect(state.checkSessionError).toEqual(expect.anything());
  });

  it('handles action type USER_CHECK_SESSION_DISMISS_ERROR correctly', () => {
    const prevState = { checkSessionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USER_CHECK_SESSION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkSessionError).toBe(null);
  });
});

