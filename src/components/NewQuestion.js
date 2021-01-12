import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {

  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleSubmit = e => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    this.props.dispatch(handleAddQuestion(optionOne, optionTwo))
    this.props.history.push('/')
  };

  handleChangeOptionOne = e => {
    this.setState({
      optionOne: e.target.value
    })
  };

  handleChangeOptionTwo = e => {
    this.setState({
      optionTwo: e.target.value
    })
  };

  render() {
    const { optionOne, optionTwo } = this.state

    return (
      <div className="center">
        <h1>
          Would you rather...
        </h1>
        <form onSubmit={this.handleSubmit} className="new-question">
          <div>
            <input
              className="input-option center"
              placeholder="Enter option 1"
              value={optionOne}
              onChange={this.handleChangeOptionOne} />
          </div>
          <p>or</p>
          <div style={{ marginBottom: '20px' }}>
            <input
              className="input-option center"
              placeholder="Enter option 2"
              value={optionTwo}
              onChange={this.handleChangeOptionTwo} />
          </div>
          <div>
            <input type="submit" value="Submit" className="btn" disabled={optionOne === '' || optionTwo === ''} />
          </div>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)