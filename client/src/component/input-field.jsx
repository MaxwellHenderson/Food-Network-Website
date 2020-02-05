import React, { Component } from "react";

class InputField extends Component {
  state = {};
  render() {
    const {
      labelName,
      placeHolder,
      input
    } = this.props;
    return (
      <div>
        <label>{labelName}:</label>
        <input
          type="text"
          class="form-control"
          placeholder={placeHolder}
          ref={input}
        ></input>
      </div>
    );
  }
}

export default InputField;
