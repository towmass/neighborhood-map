import React from "react";
import PropTypes from "prop-types";
import Search from "./Search";

// Section for searching, filtering and manipulating with given locations
class Nav extends React.Component {
  static propTypes = {
    filtered: PropTypes.array.isRequired,
    enterClicked: PropTypes.func.isRequired
  };

  render() {
    const { filtered, enterClicked } = this.props;

    return (
      <nav className="nav">
        <section
          className="search"
          aria-label="Filter through locations"
          onKeyDown={e => enterClicked(e)} // Accessability - enter key enabled
        >
          <p className="credit">By Google Maps API & MediaWiki API</p>
          <p>Search places:</p>
          <Search
            onClick={this.props.link}
            onChange={this.props.searchValue}
            filtered={filtered}
          />
          <p>
            <strong>Pro tip:</strong> Use ENTER key to quickly display location
            details and ESCAPE key for closing location details.
          </p>
        </section>
      </nav>
    );
  }
}

export default Nav;
