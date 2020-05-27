import React, { Component } from "react";
import { Form, Button, DropdownButton, Dropdown, Col, Row } from "react-bootstrap";
import StarRating from "./StarRating";
import CurrencyInput from "react-currency-input";
import MealTags from "./MealTags";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.mealNameInput = React.createRef();

    this.state = {
      minPrice: 0,
      maxPrice: 0,
    };
  }

  clearInputs = () => {
    this.mealNameInput.current.value = "";
    this.setState({ minPrice: 0 });
    this.setState({ maxPrice: 0 });
  };

  render() {
    const {
      cities,
      selectedCity,
      updateSelectedCity,
      sortOptions,
      selectedSortOption,
      updateSortOption,
      getMeals,
      updateRequestedMeal,
      updatePriceRange,
      updateMealTags,
      updateRequestedRating,
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
            <Form.Control placeholder="Meal Name" ref={this.mealNameInput} />
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <CurrencyInput
                  value={this.state.minPrice}
                  onChangeEvent={(event, maskedvalue, floatvalue) => {
                    this.setState({ minPrice: maskedvalue });
                  }}
                />
              </Col>
              <Col>
                <CurrencyInput
                  value={this.state.maxPrice}
                  onChangeEvent={(event, maskedvalue, floatvalue) => {
                    this.setState({ maxPrice: maskedvalue });
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <StarRating onSelect={updateRequestedRating} />
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
            onSelect={(event) => updateSelectedCity(event)}
          >
            {cities.map((city) => (
              <Dropdown.Item eventKey={city}>{city}</Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            id="dropdown-basic-button"
            className="mx-3"
            title={selectedSortOption}
            onSelect={(event) => updateSortOption(event)}
          >
            {sortOptions.map((sortOption) => (
              <Dropdown.Item eventKey={sortOption}>{sortOption}</Dropdown.Item>
            ))}
          </DropdownButton>
          <Button className="mx-3" variant="primary" type="button" onClick={() => this.clearInputs()}>
            Clear
          </Button>
          <Button
            className="mx-3"
            variant="primary"
            type="button"
            onClick={() => {
              updateRequestedMeal(this.mealNameInput.current.value);
              updatePriceRange(this.state.minPrice, this.state.maxPrice);
              getMeals();
            }}
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
