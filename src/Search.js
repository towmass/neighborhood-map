import React from "react";
import PropTypes from "prop-types";

class Search extends React.Component {
  static propTypes = {
    filtered: PropTypes.array.isRequired
  };

  render() {
    const { filtered } = this.props;

    let listedResults = filtered.map(item => {
      // Create a list of filtered locations
      return (
        <li
          id={item.no}
          key={item.name}
          role="link"
          tabIndex="0"
          onClick={e => this.props.onClick(item.name)}
          className="filtered-location"
        >
          {item.name}
        </li>
      );
    });

    return (
      <div
        role="search"
        aria-label="Section for filtering and displaying locations"
      >
        <input
          role="searchbox"
          tabIndex="0"
          className="search-input"
          type="text"
          placeholder="Start typing..."
          value={this.props.value}
          onChange={e => this.props.onChange(e.target.value)}
        />

        <div
          role="listbox"
          aria-label="Filtered results of searched locations"
          className="filtered-location"
        >
          {listedResults.length ? ( // Conditional (ternary) operator, presented https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators
            listedResults
          ) : (
            <p>
              Sorry, there were not found any locations which would correspond
              to your search.
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
