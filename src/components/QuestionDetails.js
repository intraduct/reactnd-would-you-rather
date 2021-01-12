import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionAnswer } from '../actions/shared'
import NotFound from './NotFound'

const OPTION_ONE = 'optionOne'
const OPTION_TWO = 'optionTwo'

class QuestionDetail extends Component {

  state = {
    answer: ''
  }

  handleChange = e => {
    this.setState({
      answer: e.target.value
    })
  };

  handleSubmit = e => {
    e.preventDefault();

    const { answer } = this.state
    const { authedUser, question, dispatch } = this.props
    const qid = question.id

    dispatch(handleQuestionAnswer({ authedUser, qid, answer }))
  };

  isOptionChecked(option) {
    const { users, authedUser, question } = this.props
    const { answer } = this.state

    return answer === option || users[authedUser].answers[question.id] === option
  }

  render() {
    const { question, author, showResult } = this.props
    if (question === null) {
      return (
        <NotFound />
      )
    }

    const votesOptionOne = question.optionOne.votes.length
    const votesOptionTwo = question.optionTwo.votes.length
    const votesTotal = votesOptionOne + votesOptionTwo
    let percentageOptionOne, percentageOptionTwo;
    if (votesTotal !== 0) {
      percentageOptionOne = Math.round(votesOptionOne / votesTotal * 100)
      percentageOptionTwo = Math.round(votesOptionTwo / votesTotal * 100)
    }

    return (
      <div className="card">
        <div className="left-card">
          <img src={author.avatarURL} alt={author.name} />
          <div className="author-name center">{author.name} asks</div>
        </div>
        <div className="right-card">
          <h3>Would you rather...</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="container-result">
              {showResult &&
                <div className="option-one" style={{ width: `${percentageOptionOne}%` }} />}
              <div className="overlay-left">
                <input
                  type="radio"
                  id="radio-one"
                  name="switch-one"
                  value={OPTION_ONE}
                  checked={this.isOptionChecked(OPTION_ONE)}
                  disabled={this.props.showResult}
                  onChange={this.handleChange} />
                <label htmlFor="radio-one" >... {question.optionOne.text}</label>
              </div>
              {showResult &&
                <div className="overlay-right">
                  {percentageOptionOne}% ({votesOptionOne}/{votesTotal} votes)
                </div>}
            </div>
            <div className="container-result">
              {showResult &&
                <div className="option-two" style={{ width: `${percentageOptionTwo}%` }} />}
              <div className="overlay-left">
                <input
                  type="radio"
                  id="radio-two"
                  name="switch-two"
                  value={OPTION_TWO}
                  checked={this.isOptionChecked(OPTION_TWO)}
                  disabled={this.props.showResult}
                  onChange={this.handleChange} />
                <label htmlFor="radio-two" >... {question.optionTwo.text}</label>
              </div>
              {showResult &&
                <div className="overlay-right">
                  {percentageOptionTwo}% ({votesOptionTwo}/{votesTotal} votes)
              </div>}
            </div>
            {!showResult &&
              <button type="submit" className="btn" disabled={this.state.answer === ''}>Submit</button>}
          </form>
        </div>
      </div >
    )
  }
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { qid } = props.match.params

  const question = questions[qid] ? questions[qid] : null
  const author = question ? users[question.author] : null
  return {
    authedUser,
    users,
    question,
    author,
    showResult: question ? (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) : false
  }
};

export default connect(mapStateToProps)(QuestionDetail)