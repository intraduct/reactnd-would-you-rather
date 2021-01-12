import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionOverview from './QuestionOverview'


const UNANSWERED = 'unanswered'
const ANSWERED = 'answered'

class QuestionList extends Component {

  state = {
    displayUnanswered: true
  }

  handleChangeView = e => {
    let displayUnanswered = e.target.value === UNANSWERED
    this.setState({
      displayUnanswered
    })
  };

  getQuestionsForDisplay = () => {
    let { questionIds, authedUser } = this.props
    let answeredQuestionIds = Object.keys(authedUser.answers)
    let unansweredQuestionIds = questionIds.filter(qId => !answeredQuestionIds.includes(qId))
    return this.state.displayUnanswered ? unansweredQuestionIds : answeredQuestionIds
  };

  render() {
    let displayQuestions = this.getQuestionsForDisplay()

    return (
      <div className="center">
        <div className="switch-field">
          <input
            type="radio"
            id="radio-one"
            name="switch-one"
            value={UNANSWERED}
            checked={this.state.displayUnanswered}
            onChange={this.handleChangeView} />
          <label htmlFor="radio-one">Unanswered</label>
          <input
            type="radio"
            id="radio-two"
            name="switch-one"
            value={ANSWERED}
            checked={!this.state.displayUnanswered}
            onChange={this.handleChangeView} />
          <label htmlFor="radio-two">Answered</label>
        </div>
        <ul>
          {displayQuestions.map(questionId =>
            <li key={questionId} style={{ padding: '10px' }}>
              <QuestionOverview id={questionId} />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    authedUser: users[authedUser]
  }
}

export default connect(mapStateToProps)(QuestionList)