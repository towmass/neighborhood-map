import React from "react";
import "./App.css";
import Top from "./Top";
import Nav from "./Nav";
import MapAPI from "./MapAPI";
import escapeRegExp from "escape-string-regexp";

// Authentication failure handling from https://developers.google.com/maps/documentation/javascript/events
window.gm_authFailure = () => {
  document.getElementById("map").innerHTML =
    "An error occured while loading the map. Try to restart the app, please. " +
    "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Emojione_1F613.svg/240px-Emojione_1F613.svg.png'>";
}; // Emoji credit: https://commons.wikimedia.org/wiki/File:Emojione_1F613.svg

// Using ES6 syntax for creating the App component
class App extends React.Component {
  state = {
    wikipedia: [], // Store data for MediaWiki API
    showingInfoWindow: false,
    // activeMarker: {},
    selection: {},
    items: [
      // List of locations used in this app
      {
        // Coordinates retrieved by using https://gps-coordinates.org/
        name: "Washington Square Park",
        position: { lat: 40.730836, lng: -73.99734 },
        visible: true,
        animate: false,
        no: 0 // unique ID number
      },
      {
        name: "Central Park",
        position: { lat: 40.782881, lng: -73.965368 },
        visible: true,
        animate: false,
        no: 1
      },
      {
        name: "Times Square",
        position: { lat: 40.758895, lng: -73.985152 },
        visible: true,
        animate: false,
        no: 2
      },
      {
        name: "New York Stock Exchange",
        position: { lat: 40.706929, lng: -74.011288 },
        visible: true,
        animate: false,
        no: 3
      },
      {
        name: "Brooklyn Bridge",
        position: { lat: 40.706409, lng: -74.000945 },
        visible: true,
        animate: false,
        no: 4
      },
      {
        name: "Ellis Island",
        position: { lat: 40.699389, lng: -74.041586 },
        visible: true,
        animate: false,
        no: 5
      },
      {
        name: "Statue of Liberty",
        position: { lat: 40.689254, lng: -74.044504 },
        visible: true,
        animate: false,
        no: 6
      }
    ]
  };

  // Accessability feature
  // Enable clicking filtered items and anchors by ENTER key, note: keycode 13 = ENTER
  enterClicked = event => {
    if (event.keyCode === 13) {
      document.activeElement.click();
    }
  };

  // Mechanism for connecting filtered items in navigation and markers showed on map
  link = event => {
    let targeted = [...document.querySelectorAll(".gmnoprint")];
    if (document.getElementById("map")) {
      targeted.find(mark => mark.title === event).click();
    } else {
      // In case of error
      document.getElementById("map").innerText =
        "Sorry, an error has occured, try refresh the page.";
    }
  };

  // For keeping value of search bar up-to-date
  searchValue = value => {
    this.setState({ value: value.trim() });
  };

  render() {
    const { value, items } = this.state;

    // Mechanism for filtering search results
    let filtered;
    if (value && items) {
      const same = new RegExp(escapeRegExp(value), "i");
      // In case of the same result as in the filtered array
      filtered = items.filter(item => same.test(item.name));
    } else {
      filtered = items ? items : []; // Conditional (ternary) operator, adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators
    }

    return (
      <div className="container">
        <Top />
        <Nav
          filtered={filtered}
          searchValue={this.searchValue}
          link={this.link}
          enterClicked={this.enterClicked}
        />
        <div
          aria-label="Rendered Map Powered by Google Showing New York City"
          role="application"
          id="map"
          className="map"
          tabIndex="-1"
        >
          <MapAPI
            places={this.state.items}
            filtered={filtered}
            mapClicked={this.mapClicked}
            showingInfoWindow={this.state.showingInfoWindow}
            link={this.link}
            markerClicked={this.markerClicked}
            selection={this.state.selection}
          />
        </div>
      </div>
    );
  }
}

export default App;
