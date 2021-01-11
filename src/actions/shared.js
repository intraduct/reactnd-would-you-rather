import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { receiveQuestions, handleReceiveQuestions } from './questions'
import { receiveUsers, handleReceiveUsers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData() {
  return (dispatch) => {

    dispatch(showLoading())

    getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveQuestions(questions))
        dispatch(receiveUsers(users))
        dispatch(hideLoading())
      })
  }
}

export function handleQuestionAnswer(questionAnswer) {
  return (dispatch) => {

    dispatch(showLoading())

    return saveQuestionAnswer(questionAnswer)
      .then(() => {
        dispatch(handleReceiveQuestions())
        dispatch(handleReceiveUsers())
      })
      .then(() => dispatch(hideLoading()))
  }
}