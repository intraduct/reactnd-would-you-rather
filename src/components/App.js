import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import QuestionList from './QuestionList'
import Login from './Login'
import { handleInitialData } from '../actions/shared'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Navigation from './Navigation'
import NotFound from './NotFound'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <LoadingBar />
        <Navigation />
        {this.props.login === true ?
          <Login /> :
          <Switch>
            <Route path="/" exact component={QuestionList} />
            <Route path="/questions/:qid" component={QuestionDetails} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route component={NotFound} />
          </Switch>}
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    login: authedUser === null
  }
}

export default connect(mapStateToProps)(App)