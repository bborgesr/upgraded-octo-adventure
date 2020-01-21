import React, { Component } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import "../node_modules/react-accessible-accordion/dist/fancy-example.css";

import Items from "./Items"; // load up the information of Items

import ItemInfo from "./components/ItemInfo";
import Search from "./components/Search";
import Checkbox from "./components/Checkbox";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: Items,
      filter: [],
      search: "",
      checked: false,
      counter: 0
    };

    this.onSearch = this.onSearch.bind(this);
    this.findItem = this.findItem.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.findFilter = this.findFilter.bind(this);
    this.alreadyIn = this.alreadyIn.bind(this);
    this.clearAll = this.clearAll.bind(this);
    // this.onCheckboxClick = this.onCheckboxClick.bind(this);
  }

  onSearch(keyword) {
    let list = Items.map(item => {
      if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
        return item;
      } else return undefined;
    });
    list = list.filter(item => item !== undefined);
    this.setState({ items: list });
  }

  onFilter(filter, include) {
    // do we include the search results too?
    // add filter to the list of things to filter
    var currentFilters = this.state.filter;
    var newCurrentFilters = [];

    // find out if the filter is adding or removing
    if (include) {
      // add to filter
      if (!this.findFilter(currentFilters, filter)) {
        newCurrentFilters.push(filter);
      }
    } else {
      // remove from filter
      if (this.findFilter(currentFilters, filter)) {
        var index = currentFilters.indexOf(filter);
        currentFilters.splice(index, 1);
      }
    }

    for (var c = 0; c < currentFilters.length; c++) {
      newCurrentFilters.push(currentFilters[c]);
    }

    var newItems = [];
    for (var i = 0; i < Items.length; i++) {
      var item = Items[i];
      for (var f = 0; f < newCurrentFilters.length; f++) {
        if (item.category.includes(newCurrentFilters[f])) {
          if (!this.findItem(newItems, item.key)) {
            if (!this.alreadyIn(newItems, item)) {
              newItems.push(item);
            }
          }
        }
        if (newCurrentFilters[f] === "Over 2 Stars" && item.rating > 2) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "Over 3 Stars" && item.rating > 3) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "Over 4 Stars" && item.rating > 4) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "Over $500" && item.price > 500) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (
          newCurrentFilters[f] === "$100-$500" &&
          item.price < 500 &&
          item.price > 100
        ) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (
          newCurrentFilters[f] === "$50-$100" &&
          item.price < 100 &&
          item.price > 50
        ) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (
          newCurrentFilters[f] === "$10-$50" &&
          item.price < 50 &&
          item.price > 10
        ) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (
          newCurrentFilters[f] === "Less than $10" &&
          item.price < 10 &&
          item.price > 0
        ) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        // if the amount of people enrolled is less than the class size, we have room
        if (newCurrentFilters[f] === "In Stock" && item.itemsLeft > 0) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
      }
    }

    // this return all even when our filter has none, maybe take care of this case?
    if (newItems.length === 0) {
      // default to all
      newItems = Items;
    }

    this.setState({ items: newItems, filter: newCurrentFilters });
  }

  findItem(items, key) {
    var myitem = null;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.key === key) {
        myitem = item;
      }
    }
    return myitem;
  }

  findFilter(filters, value) {
    var myFilter = null;
    for (var i = 0; i < filters.length; i++) {
      var filter = filters[i];
      if (filter === value) {
        myFilter = filter;
      }
    }
    return myFilter;
  }

  alreadyIn(items, item) {
    for (var i = 0; i < items.length; i++) {
      if (item === items[i]) {
        return true;
      }
    }
    return false;
  }

  clearAll() {
    // TODO figure out how to uncheck all checkboxes
    // this.setState({ items: Items });
    // this.setState({ checked: true });
    // this.setState({ checked: false });
    // this.setState({ counter: this.state.counter + 1 });
    this.setState({
      items: Items,
      filter: [],
      counter: this.state.counter + 1
    });
    // console.log(this.state.checked);
  }

  // onCheckboxClick(checked) {
  //   this.setState({ checked: !checked });
  // }

  render() {
    const list = this.state.items.map(item => {
      return <ItemInfo key={item.key} item={item} />;
    });
    return (
      <div className="background-white">
        <div className="background-blue white-text">
          <Search onSearch={this.onSearch} />
        </div>

        <div className="grid-page">
          <div className="grid-page-column allshade top">
            <div className="box border shade3">
              <p className="header-text black-text font">Filter</p>
              <div className="font">
                <Accordion allowZeroExpanded="true">
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <span className="category left">Category</span>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Checkbox
                        label="Electronics"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                      <Checkbox
                        label="Books"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                      <Checkbox
                        label="Toys"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                      <Checkbox
                        label="School"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <span className="category left">Availabity</span>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Checkbox
                        label="In Stock"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <span className="category left">Price</span>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Checkbox
                        label="Over $500"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                      <Checkbox
                        label="$100-$500"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                      <Checkbox
                        label="$50-$100"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                      <Checkbox
                        label="$10-$50"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                      <Checkbox
                        label="Less than $10"
                        onFilter={this.onFilter}
                        counter={this.state.counter}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <span className="category left">Rating</span>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Checkbox
                        label="Over 4 Stars"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                      <Checkbox
                        label="Over 3 Stars"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                      <Checkbox
                        label="Over 2 Stars"
                        onFilter={this.onFilter}
                        checked={this.state.checked}
                        counter={this.state.counter}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="center entry">
                <input
                  className="button background-blue white-text"
                  type="button"
                  value="Clear All"
                  onClick={this.clearAll}
                />
              </div>
              <div className="entry"></div>
            </div>
          </div>

          <div className="grid-page-column">
            <div className="horizontal-bar"></div>
          </div>

          <div className="grid-page-column">
            <div className="grid-result-header">
              <div className="grid-result-header-column">
                <p className="header-text black-text font">Results</p>
              </div>
              <div className="grid-result-header-column">
                <p className="small-text gray-text font">
                  Returned {list.length} results
                </p>
              </div>
            </div>

            <div className="font results">{list}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
