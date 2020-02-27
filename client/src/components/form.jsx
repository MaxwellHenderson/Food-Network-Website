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
      <Form className="w-25">
        <Form.Group className="">
          <Form.Control placeholder="Name" ref={mealNameInput} />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Price" ref={mealPriceInput} />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Url" ref={mealImagePathInput} />
        </Form.Group>
        {/* <Button variant="primary" type="" onClick={() => onClick()}>
        <Button variant="" type="" > */}
        <div className="btn" onClick={() => onClick()}>
            Post meal listing
        </div>
        {/* </Button> */}
      </Form>
    );
  }
}

export default AddListingForm;
