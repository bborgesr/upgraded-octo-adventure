import React, { Component } from "react";

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };

    this.onFilter = this.onFilter.bind(this);
  }

  onFilter(event) {
    this.props.onFilter(
      event.currentTarget.dataset.value,
      event.currentTarget.checked
    );
    this.setState({ checked: !this.state.checked });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.counter !== this.props.counter) {
      this.setState({
        checked: false
      });
    }
  }

  render() {
    var label = this.props.label;
    return (
      <p>
        <input
          className="checkbox"
          type="checkbox"
          data-value={label}
          onChange={this.onFilter}
          checked={this.state.checked}
        />
        {label}
      </p>
    );
  }
}

export default Checkbox;
