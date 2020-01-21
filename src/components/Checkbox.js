import React, { Component } from "react";

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked
    };

    this.onFilter = this.onFilter.bind(this);
  }

  onFilter(event) {
    this.props.onFilter(
      event.currentTarget.dataset.value,
      event.currentTarget.checked
    );
    this.setState({ checked: !this.state.checked });
    // this.props.onClick(this.state.checked);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.counter !== this.props.counter) {
      this.setState({
        checked: this.props.checked
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
          // checked={this.props.checked}
          // defaultChecked={this.state.checked}
        />
        {label}
      </p>
    );
  }
}

export default Checkbox;
