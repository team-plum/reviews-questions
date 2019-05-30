import React from 'react';
const moment = require('moment');

import { MdAssignmentInd, MdStars } from 'react-icons/md';
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';

const Answer = props => {
  return (
    <Media>
      <img width={30} height={33} className="mr-3" src={props.answer.imgUrl} />
      <Media.Body>
        <MdAssignmentInd size="13" style={{ color: 'orange' }} />
        {props.answer.friendCount}
        <MdStars size="13" style={{ color: 'orange' }} /> {props.answer.stars}
        <p>{JSON.parse(props.answer.text)}</p>
        <Button size="sm" variant="light">
          Helpful!
        </Button>
        <Button size="sm" variant="light">
          Not Helpful
        </Button>
        <br />
        <small style={{ color: 'gray' }}>
          {moment(JSON.parse(props.answer.time)).fromNow()}
        </small>
      </Media.Body>
      <br />
    </Media>
  );
};

export default Answer;
