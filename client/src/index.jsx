import React from 'react';
import ReactDOM from 'react-dom';

import QuestionsView from './components/QuestionsView.jsx';
import Input from './components/Input.jsx';

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
    console.log(questionText);
    // this.setState({ question: questionText });
    // TODO: Force a render of Questions View
  }

  componentDidMount() {
    //set random integer && ToString to add to endpoint
    let num = Math.floor(Math.random() * 100 + 1) + '';
    axios
      .get('/api/questions/' + num)
      .then(data => {
        //SET STATE
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
          {/* <ListGroup>
            <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          </ListGroup> */}
          {/* <Input handleSubmit={this.handleSubmit} name={this.state.name} /> */}
          <QuestionsView />
        </Card>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
