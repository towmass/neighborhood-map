import React from "react";
import Burger from "./Burger";

// Top (header) part of the app
class Top extends React.Component {
  render() {
    return (
      <header className="top" aria-label="Map Header">
        <h1>New York Places Map</h1>
        <Burger />
      </header>
    );
  }
}

export default Top;
