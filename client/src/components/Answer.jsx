import React from 'react';

import Media from 'react-bootstrap/Media';

function Answer(props) {
  return (
    <Media>
      <img
        width={30}
        height={33}
        className="mr-3"
        src="https://images.dog.ceo/breeds/samoyed/n02111889_691.jpg"
      />
      <Media.Body>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
        <small>TIME</small>
      </Media.Body>
    </Media>
  );
}

export default Answer;
