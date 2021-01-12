import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const QuestionOverview = ({ question, author }) => {
  return (
    <div className="card">
      <div className="left-card">
        <img src={author.avatarURL} alt={author.name} />
        <div className="author-name center">{author.name} asks</div>
      </div>
      <div className="right-card">
        <h3>Would you rather...</h3>
        <div style={{ marginBottom: '20px' }}>... {question.optionOne.text} ...</div>
        <Link to={`/questions/${question.id}`} className="btn">View question</Link>
      </div>
    </div>
  )
};

const mapStateToProps = ({ questions, users }, { id }) => {
  const question = questions[id]
  const author = users[question.author]

  return {
    question,
    author
  }
};

export default connect(mapStateToProps)(QuestionOverview)