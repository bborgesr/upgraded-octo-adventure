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
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      items: Items,
      filter: [],
      search: ""
    };
  }

  componentDidMount() {}

  onSearch(keyword) {
    let list = Items.map(item => {
      if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
        return item;
      } else return undefined;
    });
    list = list.filter(item => item !== undefined);
    this.setState({ items: list });
  }

  onFilter() {
    // filters
  }

  findFilter() {}

  findItem() {}

  alreadyIn() {}

  clearAll() {}

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
                      <Checkbox label="Electronics" onFilter={this.onFilter} />
                      <Checkbox label="Books" onFilter={this.onFilter} />
                      <Checkbox label="Toys" onFilter={this.onFilter} />
                      <Checkbox label="School" onFilter={this.onFilter} />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <span className="category left">Availabity</span>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Checkbox label="In Stock" onFilter={this.onFilter} />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <span className="category left">Price</span>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Checkbox label="Over $500" onFilter={this.onFilter} />
                      <Checkbox label="$100-$500" onFilter={this.onFilter} />
                      <Checkbox label="$50-$100" onFilter={this.onFilter} />
                      <Checkbox label="$10-$50" onFilter={this.onFilter} />
                      <Checkbox
                        label="Less than $10"
                        onFilter={this.onFilter}
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
                      <Checkbox label="Over 4 Stars" onFilter={this.onFilter} />
                      <Checkbox label="Over 3 Stars" onFilter={this.onFilter} />
                      <Checkbox label="Over 2 Stars" onFilter={this.onFilter} />
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
