import React, { Component } from "react";
import { Card, Accordion, Button, Badge } from "react-bootstrap";

class Listing extends Component {
  render() {
    const { mealID, mealName } = this.props.listing;
    const { isNew, isChecked, onChange } = this.props;
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="{mealID}">
            <h4>
              {mealName} {isNew && <Badge variant="secondary">New</Badge>}
            </h4>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="{mealID}">
          <Card.Body>
            <p>Meal ID: {mealID}</p> <p>Meal Name: {mealName}</p>
            <span>
              Purchase?
              <input
                type="checkbox"
                value={mealID}
                checked={isChecked(mealID)}
                onChange={onChange}
              />
            </span>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

export default Listing;
