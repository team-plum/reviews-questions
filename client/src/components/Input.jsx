import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  render() {
    return (
      <div>
        <Form.Control
          size="lg"
          type="text"
          placeholder={`What would you like users to know about ${
            this.props.name
          }?`}
          ref={this.textInput}
        />
        <br />
        <input type="checkbox" /> Notify me of new answers
        <br />
        <Button
          onClick={e => {
            this.props.handleSubmit(e, this.textInput.current.value);
          }}
          variant="danger"
          size="sm"
        >
          Post Question
        </Button>
      </div>
    );
  }
}

export default Input;
