import React, { Component } from "react";

class InputField extends Component {
  state = {};
  render() {
    const {
      labelName,
      placeHolder,
      input,
      onChange
    } = this.props;
    return (
      <div>
        <label>{labelName}:</label>
        <input
          type="text"
          class="form-control"
          placeholder={placeHolder}
          ref={input}
          onChange={onChange}
        ></input>
      </div>
    );
  }
}

export default InputField;
