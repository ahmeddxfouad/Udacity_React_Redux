import {
  RECEIVE_QUESTIONS,
  SAVE_ANSWER,
  ADD_QUESTION
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_ANSWER:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.hasLiked]: {
            ...state[action.id][action.hasLiked],
            votes: state[action.id][action.hasLiked].votes.concat([action.authedUser])
          },
        },
      };
    case ADD_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
