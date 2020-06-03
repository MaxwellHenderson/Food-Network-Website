import React, { Component } from "react";
import { FaStar } from "react-icons/fa";

class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
    };
  }

  render() {
    const { onSelect } = this.props;
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() =>
                  this.setState({ rating: ratingValue }, () => {
                    onSelect(this.state.rating);
                  })
                }
              />
              <FaStar className="star" color={ratingValue <= this.state.rating ? "#ffc107" : "#e4e5e9"} size={40} />
            </label>
          );
        })}
      </div>
    );
  }
}

export default StarRating;