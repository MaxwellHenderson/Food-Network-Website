"use strict";

import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";

class CardList extends Component {
  render() {
    let foodCards = this.props.foodItems.map((foodItem, index) => {
      let card = (
        <FoodCard
          key={foodItem.mealID}
          id={foodItem.mealID}
          name={foodItem.mealName}
          price={foodItem.mealPrice}
          description={foodItem.mealDescription}
          imgUrl={foodItem.mealImagePath}
          imgAlt={foodItem.imgAlt}
        />
      );

      if (index % 4 == 0) {
        return (
          <React.Fragment>
            <div class="w-100"></div>
            {card}
          </React.Fragment>
        );
      } else {
        return card;
      }
    });

    return (
      <div class="container mt-5 py-3">
        <div class="row justify-content-center">{foodCards}</div>
      </div>
    );
  }
}

class FoodCard extends Component {
  render() {
    const { id, name, price, description, imgUrl, imgAlt } = this.props;
    return (
      <span className="mr-3 ml-3 mt-3 col-md-4 col-sm-6 col-xl-2 listing">
        <img
          src={imgUrl}
          alt={imgAlt}
          style={{ width: "200px", height: "200px" }}
        />
        {/* <p className="listingText">{name}</p> */}
        <ListGroup>
          <ListGroup.Item>ID: {id}</ListGroup.Item>
          <ListGroup.Item>Name: {name}</ListGroup.Item>
          <ListGroup.Item>Price: {price}</ListGroup.Item>
        </ListGroup>
      </span>
    );
  }
}

export default CardList;
