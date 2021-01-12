import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'

class Login extends Component {

  state = {
    value: ''
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  };

  handleSubmit = e => {
    this.props.dispatch(handleSetAuthedUser(this.state.value))
    e.preventDefault()
  };

  render() {
    let { users, loading } = this.props

    return (
      <div className="login center">
        <h1>Login</h1>
        <div>
          {loading ? null :
            <form onSubmit={this.handleSubmit}>
              <select value={this.state.value} onChange={this.handleChange} >
                <option disabled value=""> -- Select a user -- </option>
                {users.map(user => (
                  <option value={user.id} key={user.id}>{user.name}</option>
                ))}
              </select>
              <input type="submit" value="Login" className="btn" />
            </form>}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users: Object.values(users),
    loading: Object.keys(users).length === 0
  }
}

export default connect(mapStateToProps)(Login)