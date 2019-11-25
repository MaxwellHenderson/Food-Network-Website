"use strict";

import React, { Component } from "react";

class CardList extends Component {
  render() {
    console.log(this.props.foodItems);
    let foodCards = this.props.foodItems.map((foodItem, index) => {
      let card = (
        <FoodCard
          // name={foodItem.name}
          // imgUrl={foodItem.imgUrl}
          // imgAlt={foodItem.imgAlt}
          name={foodItem.mealName}
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
    const { name, imgUrl, imgAlt } = this.props;
    return (
      <span className="mr-3 ml-3 mt-3 col-md-4 col-sm-6 col-xl-2 listing">
        <img
          src={imgUrl}
          alt={imgAlt}
          style={{ width: "200px", height: "200px" }}
        />
        <p className="listingText">{name}</p>
      </span>
    );
  }
}

export default CardList;
