import React from 'react';
const moment = require('moment');

import Media from 'react-bootstrap/Media';

import Answer from '../components/Answer.jsx';

class QuestionsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Media>
        <img
          width={30}
          height={33}
          className="mr-3"
          src="https://images.dog.ceo/breeds/samoyed/n02111889_691.jpg"
        />
        <Media.Body>
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus</p>
          <small>TIME HERE</small>
          <Answer />
        </Media.Body>
      </Media>
    );
  }
}

export default QuestionsView;
