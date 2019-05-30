import React from 'react';

import Media from 'react-bootstrap/Media';

import Answer from '../components/Answer.jsx';
const moment = require('moment');

class QuestionsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    {
      return this.props.questions.map((item, i) => {
        let answers = [];
        for (var answer of this.props.answers) {
          if (item.qID !== undefined) {
            if (answer.aID === item.qID) {
              answers.push(<Answer answer={answer} />);
            }
          }
        }
        return (
          <Media key={i}>
            <img width={30} height={33} className="mr-3" src={item.imgUrl} />
            <Media.Body>
              <p>{item.text}</p>
              <small style={{ color: 'gray' }}>
                {item.helpful + ' people found this helpful'}
              </small>
              <br />
              <small style={{ color: 'gray' }}>
                {moment(JSON.parse(item.time)).fromNow()}
              </small>
              <br />
              {answers}
            </Media.Body>
          </Media>
        );
      });
    }
  }
}

export default QuestionsView;
