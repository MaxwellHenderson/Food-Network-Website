import React, { Component } from "react";
import { Badge, Form } from "react-bootstrap";

class Tags extends Component {
  constructor() {
    super();

    this.state = {
      tags: [],
    };
  }

  render() {
    return (
      <div className="input-tag">
        {this.state.tags.map((tag, i) => (
          <Badge variant="primary" key={tag}>
            {tag}
            <button
              type="button"
              onClick={() => {
                this.removeTag(i);
              }}
            >
              x
            </button>
          </Badge>
        ))}
        <input
          type="text"
          placeholder="Enter tags..."
          onKeyDown={this.inputKeyDown}
          ref={(c) => {
            this.tagInput = c;
          }}
        />
      </div>
    );
  }

  inputKeyDown = (event) => {
    const val = event.target.value;
    if (event.key === "Enter" && val) {
      // Check if tag already exists
      if (this.state.tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) return;
      this.setState({ tags: [...this.state.tags, val.toLowerCase()] }, () => {
        this.props.updateMealTags(this.state.tags);
      });
      this.tagInput.value = null;
    } else if (event.key === "Backspace" && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  };

  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags }, () => {
      this.props.updateMealTags(this.state.tags);
    });
  };
}

export default Tags;
