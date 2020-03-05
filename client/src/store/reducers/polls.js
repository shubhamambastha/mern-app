import { SET_POLLS, SET_CURRENT_POLL } from '../actionTypes';

export const polls = (state = [], action) => {
  // all the polls is live in array
  switch (action.type) {
    case SET_POLLS:
      return action.polls;
    default:
      return state;
  }
};

export const currentPoll = (state = {}, action) => {
  // but single poll live inside object
  switch (action.type) {
    case SET_CURRENT_POLL:
      return action.poll;
    default:
      return state;
  }
};