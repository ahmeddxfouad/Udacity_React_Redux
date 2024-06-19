import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import authedUser from "../reducers/authedUser";

const AUTHED_ID = "tylermcginnis";

export function handleInitialData({id}) {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(id));
      dispatch(hideLoading());
    });
  };
}

export function handlePreLogin(){
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({users}) => {
      dispatch(receiveUsers(users))
      dispatch(hideLoading());
    })
  }
}
