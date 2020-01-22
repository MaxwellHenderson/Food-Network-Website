import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class AddListingForm extends Component {
  state = {};
  render() {
    const {
      mealNameInput,
      mealPriceInput,
      mealImagePathInput,
      onClick
    } = this.props;
    return (
      <Form>
        <Form.Group>
          <Form.Control placeholder="Name" ref={mealNameInput} />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Price" ref={mealPriceInput} />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Url" ref={mealImagePathInput} />
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => onClick()}>
          Post meal listing
        </Button>
      </Form>
    );
  }
}

export default AddListingForm;
