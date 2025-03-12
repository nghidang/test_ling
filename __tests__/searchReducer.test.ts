import reducer from '../src/reducers/searchReducer';
import * as ActionTypes from '../src/actions/types';

describe('Search Reducer', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      searchQuery: '',
      isFuzzySearch: false,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: '', payload: {}})).toEqual(initialState);
  });

  it('should handle SET_SEARCH_QUERY', () => {
    const action = {
      type: ActionTypes.SET_SEARCH_QUERY,
      payload: {searchQuery: 'test'},
    };
    const newState = reducer(initialState, action);
    expect(newState.searchQuery).toBe('test');
  });

  it('should handle SET_IS_FUZZY_SEARCH', () => {
    const action = {
      type: ActionTypes.SET_IS_FUZZY_SEARCH,
      payload: {isFuzzySearch: true},
    };
    const newState = reducer(initialState, action);
    expect(newState.isFuzzySearch).toBe(true);
  });
});
