import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CATEGORIES_CREATE_CATEGORY_BEGIN,
  CATEGORIES_CREATE_CATEGORY_SUCCESS,
  CATEGORIES_CREATE_CATEGORY_FAILURE,
  CATEGORIES_CREATE_CATEGORY_DISMISS_ERROR,
} from '../../../../src/features/categories/redux/constants';

import {
  createCategory,
  dismissCreateCategoryError,
  reducer,
} from '../../../../src/features/categories/redux/createCategory';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('categories/redux/createCategory', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createCategory succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createCategory())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORIES_CREATE_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORIES_CREATE_CATEGORY_SUCCESS);
      });
  });

  it('dispatches failure action when createCategory fails', () => {
    const store = mockStore({});

    return store.dispatch(createCategory({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORIES_CREATE_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORIES_CREATE_CATEGORY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCreateCategoryError', () => {
    const expectedAction = {
      type: CATEGORIES_CREATE_CATEGORY_DISMISS_ERROR,
    };
    expect(dismissCreateCategoryError()).toEqual(expectedAction);
  });

  it('handles action type CATEGORIES_CREATE_CATEGORY_BEGIN correctly', () => {
    const prevState = { createCategoryPending: false };
    const state = reducer(
      prevState,
      { type: CATEGORIES_CREATE_CATEGORY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createCategoryPending).toBe(true);
  });

  it('handles action type CATEGORIES_CREATE_CATEGORY_SUCCESS correctly', () => {
    const prevState = { createCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORIES_CREATE_CATEGORY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createCategoryPending).toBe(false);
  });

  it('handles action type CATEGORIES_CREATE_CATEGORY_FAILURE correctly', () => {
    const prevState = { createCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORIES_CREATE_CATEGORY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createCategoryPending).toBe(false);
    expect(state.createCategoryError).toEqual(expect.anything());
  });

  it('handles action type CATEGORIES_CREATE_CATEGORY_DISMISS_ERROR correctly', () => {
    const prevState = { createCategoryError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CATEGORIES_CREATE_CATEGORY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createCategoryError).toBe(null);
  });
});

