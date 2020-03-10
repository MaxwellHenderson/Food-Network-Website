import React, { Component } from "react";
import { Form, Button, DropdownButton, Dropdown, Col, Row } from "react-bootstrap";

class SearchForm extends Component {
  state = {};
  render() {
    const {
      mealNameInput,
      minPriceInput,
      maxPriceInput,
      cities,
      selectedCity,
      onSelect,
      onClick
    } = this.props;
    return (
      <React.Fragment>
        <Form>
          <Form.Group>
            <Form.Control placeholder="Meal Name" ref={mealNameInput} />
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Control placeholder="Minimum Price" ref={minPriceInput} />
              </Col>
              <Col>
                <Form.Control placeholder="Maximum Price" ref={maxPriceInput} />
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <DropdownButton id="dropdown-basic-button" title={selectedCity} onSelect={(event) => onSelect(event)}>
          {cities.map(city => (
            <Dropdown.Item eventKey={city}>{city}</Dropdown.Item>
          ))}
        </DropdownButton>
        <Button variant="primary" type="button" onClick={() => onClick()}>
          Search
        </Button>
      </React.Fragment>
    );
  }
}

export default SearchForm;
