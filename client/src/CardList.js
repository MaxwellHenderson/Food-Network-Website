import React, { Component } from "react";
// import ListGroup from "react-bootstrap/ListGroup";

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

          getMealById={this.props.getMealById}
        />
      );

      return card;
    });

    return (
      <div className="container mt-5 py-3 px-0">
        <div className="row justify-content-center mx-0 listing-group">{foodCards}</div>
      </div>
    );
  }
}

class FoodCard extends Component {
  render() {
    // const { id, name, price, description, imgUrl, imgAlt } = this.props;
    const { name, price, imgUrl, imgAlt } = this.props;
    return (
      <span className="mt-3 px-0 listing">
        <img
          src={imgUrl}
          alt={imgAlt}
          className="w-100 h-100"
          
          onClick = {() => this.props.getMealById(this.props.id)}
          data-toggle="modal"
          data-target="#exampleModalCenter"
        />
        <div id="card-text" className="cardText pl-2 pt-1 w-100">
          <div className="text-left">
            <div className="">
              {name}
            </div>
            <div className="font-weight-bold pt-1 pl-1">
              ${price}
            </div>
          </div>
        </div>
      </span>
    );
  }
}

export default CardList;
