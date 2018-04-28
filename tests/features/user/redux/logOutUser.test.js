import {
  USER_LOG_OUT_USER,
} from '../../../../src/features/user/redux/constants';

import {
  logOutUser,
  reducer,
} from '../../../../src/features/user/redux/logOutUser';

describe('user/redux/logOutUser', () => {
  it('returns correct action by logOutUser', () => {
    expect(logOutUser()).toHaveProperty('type', USER_LOG_OUT_USER);
  });

  it('handles action type USER_LOG_OUT_USER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: USER_LOG_OUT_USER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
