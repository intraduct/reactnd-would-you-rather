import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js'

export function getQuestions() {
  return _getQuestions()
}
export function getUsers() {
  return _getUsers()
}

export function getInitialData() {
  return Promise.all([
    _getQuestions(),
    _getUsers()
  ]).then(([questions, users]) => ({
    questions,
    users
  }))
}

export function saveQuestion(question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer(questionAnswer) {
  return _saveQuestionAnswer(questionAnswer)
}