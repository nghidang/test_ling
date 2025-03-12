import * as ActionTypes from '../actions/types';

const initialState = {
  searchQuery: '',
  isFuzzySearch: false,
};

export default (
  state = initialState,
  {
    type,
    payload,
  }: {type: string; payload: {searchQuery?: string; isFuzzySearch?: boolean}},
) => {
  switch (type) {
    case ActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload.searchQuery,
      };

    case ActionTypes.SET_IS_FUZZY_SEARCH:
      return {
        ...state,
        isFuzzySearch: payload.isFuzzySearch,
      };

    default:
      return state;
  }
};
