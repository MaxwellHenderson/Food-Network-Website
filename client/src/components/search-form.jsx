import React, { Component } from "react";
import { Form, Button, DropdownButton, Dropdown, Col, Row } from "react-bootstrap";
import StarRating from "./StarRating";
import MealTags from "./MealTags";

class SearchForm extends Component {
  state = {};
  render() {
    const {
      mealNameInput,
      minPriceInput,
      maxPriceInput,
      cities,
      selectedCity,
      handleSelectCity,
      sortOptions,
      selectedSortOption,
      handleSelectSortOption,
      onClick,
      updateMealTags,
      handleSelectRating,
      handleClearInputs,
    } = this.props;
    return (
      <div
        id="searchbar"
        className="mx-auto p-3 border border-secondary rounded collapse"
        // <div id="searchbar" className="mx-auto p-3 border border-secondary rounded"
        style={{
          zIndex: 10333,
          position: "absolute",
          left: "33%",
          backgroundColor: "white",
        }}
      >
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
          <Form.Group>
            <StarRating handleSelectRating={handleSelectRating} />
          </Form.Group>
          <Form.Group>
            <MealTags updateMealTags={updateMealTags} />
          </Form.Group>
        </Form>
        <Row className="px-3">
          <DropdownButton
            id="dropdown-basic-button"
            className="mx-3"
            title={selectedCity}
            onSelect={(event) => handleSelectCity(event)}
          >
            {cities.map((city) => (
              <Dropdown.Item eventKey={city}>{city}</Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            id="dropdown-basic-button"
            className="mx-3"
            title={selectedSortOption}
            onSelect={(event) => handleSelectSortOption(event)}
          >
            {sortOptions.map((sortOption) => (
              <Dropdown.Item eventKey={sortOption}>{sortOption}</Dropdown.Item>
            ))}
          </DropdownButton>
          <Button className="mx-3" variant="primary" type="button" onClick={() => handleClearInputs()}>
            Clear
          </Button>
          <Button
            className="mx-3"
            variant="primary"
            type="button"
            onClick={() => onClick()}
            data-toggle="collapse"
            data-target="#searchbar"
          >
            Search
          </Button>
        </Row>
      </div>
    );
  }
}

export default SearchForm;
