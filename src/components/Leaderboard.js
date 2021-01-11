import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    return (
      <ol>
        {this.props.users.map((user, index) => (
          <li key={user.id} style={{ padding: '10px' }}>
            <div className="card">
              <div className="left-card">
                <img src={user.avatarURL} alt={user.name} />
                <div className="author-name center">{index + 1}. {user.name.toUpperCase()}</div>
              </div>
              <div className="right-card center">
                <h1>Score: {user.questions + user.answers}</h1>
                <div>Asked Questions: {user.questions}</div>
                <div>Answered Questions: {user.answers}</div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

function mapStateToProps({ users }) {
  users = Object.values(users).map(u => (
    {
      ...u,
      questions: u.questions.length,
      answers: Object.keys(u.answers).length
    }
  )).sort((a, b) => b.questions + b.answers - a.questions - a.answers)

  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)