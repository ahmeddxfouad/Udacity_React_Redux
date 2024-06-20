import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_ANSWER = "SAVE_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(question, authedUser) {
  return (dispatch, getState) => {

    dispatch(showLoading());
    const currQuestion = {
      optionOneText: question.optionOneText,
      optionTwoText: question.optionTwoText,
      author: authedUser,
    }

    return saveQuestion(currQuestion)
      .then((questions) => dispatch(addQuestion(questions)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function saveAnswer({ id, authedUser, hasLiked }) {
  return {
    type: SAVE_ANSWER,
    id,
    authedUser,
    hasLiked,
  };
}

export function handleSaveQuestionAnswer(info) {
  return (dispatch) => {
    dispatch(saveAnswer(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in saveQuestionAnswer: ", e);
      dispatch(saveAnswer(info));
      alert("The was an error saving the answer. Try again.");
    });
  };
}
