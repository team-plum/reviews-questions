import React from 'react';
import ReactDOM from 'react-dom';

import QuestionsView from './components/QuestionsView.jsx';
import Input from './components/Input.jsx';
const moment = require('moment');

import Card from 'react-bootstrap/Card';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      questions: [],
      answers: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, questionText) {
    e.preventDefault();
    let question = {};
    questions.helpful = 0;
    question.imgUrl = 'https://images.dog.ceo/breeds/husky/n02110185_14479.jpg';
    question.text = questionText;
    question.time = JSON.stringify(moment().format());

    let newQuestion = [question];
    this.setState({ questions: newQuestion });
    this.forceUpdate();
  }

  componentDidMount() {
    let base = window.location.pathname;
    let arr = base.split('/');
    let id = arr[1];

    axios
      .get(`/api/questions/${id}`)
      .then(data => {
        console.log(data);
        this.setState({
          name: data.data.resName,
          questions: data.data.questions,
          answers: data.data.answers
        });
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }

  render() {
    return (
      <div>
        <Card border="danger" style={{ width: '45rem' }}>
          <Card.Header>Ask The Community</Card.Header>
          <br />
          {}
          {this.state.questions.length === 0 ? (
            <Input handleSubmit={this.handleSubmit} name={this.state.name} />
          ) : (
            <QuestionsView
              questions={this.state.questions}
              answers={this.state.answers}
            />
          )}
        </Card>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
