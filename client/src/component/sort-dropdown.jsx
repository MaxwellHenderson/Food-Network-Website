import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

class SortDropdown extends Component {
  render() {
    const { selectedSortOption, sortOptions, onClick } = this.props;
    return (
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedSortOption.option}
      >
        {sortOptions.map(sortOption => (
          <Dropdown.Item onClick={() => onClick(sortOption)}>
            {sortOption.option}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }
}

export default SortDropdown;
