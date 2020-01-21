import React, { Component } from "react";

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  onFilter() {}

  render() {
    var label = this.props.label;
    return (
      <p>
        <input
          className="checkbox"
          type="checkbox"
          data-value={label}
          onChange={this.onFilter}
          defaultChecked={this.state.checked}
        />
        {label}
      </p>
    );
  }
}

export default Checkbox;
