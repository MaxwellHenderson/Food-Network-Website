import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class SearchForm extends Component {
  state = {};
  render() {
    const {
      mealNameInput,
      ratingInput,
      cityInput,
      onClick
    } = this.props;
    return (
      <Form>
        <Form.Group>
          <Form.Control placeholder="Meal Name" ref={mealNameInput} />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Minimum Rating" ref={ratingInput} />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="City" ref={cityInput} />
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => onClick()}>
          Search
        </Button>
      </Form>
    );
  }
}

export default SearchForm;
