import React, { Component } from "react";
import Listing from "./listing";
import { Accordion } from "react-bootstrap";

class Listings extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">Meals</p>
        {this.props.listings.map(listing => (
          <Accordion>
            <Listing
              key={listing.mealID}
              listing={listing}
              isNew={listing.mealID === this.props.mostRecentListing.mealID}
              isChecked={this.props.isChecked}
              onChange={this.props.onChange}
            />
          </Accordion>
        ))}
      </div>
    );
  }
}

export default Listings;
