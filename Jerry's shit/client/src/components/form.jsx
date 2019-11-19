import React, { Component } from "react";

class Form extends Component {
  render() {
    const { labelName, textInput, buttonName, onClick } = this.props;
    return (
      <div>
        <label>{labelName}: </label>
        <input type="text" ref={textInput} />
        <input type="button" value={buttonName} onClick={() => onClick()} />
      </div>
    );
  }
}

export default Form;
