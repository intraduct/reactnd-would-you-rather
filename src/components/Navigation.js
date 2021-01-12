import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'
import { IoIosLogOut } from 'react-icons/io'

const Navigation = ({ authedUser, dispatch }) => {

  const logout = () => {
    dispatch(handleSetAuthedUser(null))
  }

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName="active">
            New Question
        </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </NavLink>
        </li>
        {authedUser ?
          <Fragment>
            <li style={{ float: 'right' }}>
              <button style={{ float: 'right' }} onClick={logout} title="Logout"><IoIosLogOut size="2em" /></button>
            </li>
            <li style={{ float: 'right' }}>
              <div>
                Hi {authedUser.name}!
              </div>
            </li>
          </Fragment> : null}
      </ul>
    </nav>
  )
}

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser: users[authedUser]
})

export default connect(mapStateToProps)(Navigation)