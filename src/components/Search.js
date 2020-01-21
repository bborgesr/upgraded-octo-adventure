import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.input = React.createRef();
  }

  onSearch() {
    const value = this.input.current.value;
    this.props.onSearch(value);
  }

  _handleKeyUp = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.onSearch();
    }
  };

  render() {
    return (
      <div className="grid-header">
        <div className="grid-header-column">
          <p className="title-text white-text font">Store Page</p>
        </div>
        <div className="grid-header-column">
          <input
            className="input-bar"
            ref={this.input}
            type="text"
            onKeyUp={this._handleKeyUp}
          />
        </div>
        <div className="grid-header-column">
          <button className="button background-gray" onClick={this.onSearch}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
