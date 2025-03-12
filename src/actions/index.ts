import * as ActionTypes from './types';

export const setSearchQuery = (payload: {searchQuery?: string}) => ({
  type: ActionTypes.SET_SEARCH_QUERY,
  payload,
});

export const setIsFuzzySearch = (payload: {isFuzzySearch?: boolean}) => ({
  type: ActionTypes.SET_IS_FUZZY_SEARCH,
  payload,
});
