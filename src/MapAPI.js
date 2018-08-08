import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PropTypes from "prop-types";

// Use of the documentation on https://www.npmjs.com/package/google-maps-react
export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selection: [],
    initialCenter: { lat: 40.729519, lng: -73.996471 },
    zoom: 12,
    center: { lat: 40.729519, lng: -73.996471 },
    wikipedia: [],
    extract: "",
    animateMarker: false,
    wikiLink: [],
    disableDefaultUI: true
  };

  // Using propTypes for faster debugging
  static propTypes = {
    filtered: PropTypes.array.isRequired,
    link: PropTypes.func.isRequired,
    selection: PropTypes.object.isRequired,
    showingInfoWindow: PropTypes.bool.isRequired,
    places: PropTypes.array.isRequired
  };

  // Accessability feature
  componentDidMount() {
    // Enable closing windows by ESCAPE key, note: keycode 27 = ESCAPE
    window.addEventListener("keyup", e => {
      if (e.keyCode === 27) {
        this.mapClicked(); // Simulates the same behaviour as when the map is clicked by mouse
      }
    });
  }

  // Fetching desired data from MediaWiki API
  loadWiki = filteredResult => {
    // Method: using an individually modified way of retrieving data from Wikipedia by creating an array of given article's details
    fetch(
      `https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${filteredResult}&limit=3`
    )
      .then(response => response.json())
      .then(array => {
        // To deliver an actual data/information from Wikipedia to infoWindow
        const details = array[2][0];
        this.setState({ wikipedia: array, extract: details }); // Details for infoWindow are stored in state
        const wikiLink =
          "https://en.wikipedia.org/w/index.php?search=" + array[0];
        this.setState({ wikiLink: wikiLink }); // Set link to redirect to Wikipedia from infoWindow
      })
      // Calling a function when error occurs
      .catch(error => {
        this.errorOccured("Error! ", error);
      });
  };

  // Error handling adapted from https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
  errorOccured = response => {
    if (response.ok === false) {
      alert("Unable to load Wiki data!");
      throw Error(response.statusText);
    }
    return response;
  };

  // Handling events for map when clicked, mainly for resetting markers and windows
  mapClicked = props => {
    this.setState({ animateMarker: false });
    if (this.state.showingInfoWindow) {
      // Cancel the current marker details and show default
      this.setState({
        animateMarker: false,
        activeMarker: {},
        showingInfoWindow: false
      });
    }
    if (
      // When zoom and center does not correspond to its default value
      this.state.zoom !== 12 &&
      this.state.center !==
        {
          lat: `${this.props.places[0].position.lat}`,
          lng: `${this.props.places[0].position.lng}`
        }
    )
      this.setState({
        // Reset original zoom and center values
        zoom: 12,
        center: {
          lat: `${this.props.places[0].position.lat}`,
          lng: `${this.props.places[0].position.lng}`
        }
      });
  };

  // Handling events for clicked marker
  markerClicked = (props, marker) => {
    this.loadWiki(props.name);
    this.setState({
      animateMarker: true,
      zoom: 17, // Provides user even more detailed info about location
      activateAnimation: true,
      selection: props,
      activeMarker: marker,
      showingInfoWindow: true,
      initialCenter: props.position,
      center: props.position
    });
  };

  // Focusing inner pop-up window as soon as the marker is clicked
  windowOpened = () => {
    const markerInfo = document.querySelector(".redirect");
    markerInfo.focus();
  };

  render() {
    const { filtered } = this.props;

    return (
      <Map
        google={this.props.google}
        onClick={this.mapClicked}
        initialCenter={this.state.initialCenter}
        center={this.state.center}
        zoom={this.state.zoom}
        disableDefaultUI={this.state.disableDefaultUI}
      >
        {filtered.map(item => {
          // Maps through filtered locations while assigning markers to them
          return (
            // Building markers
            <Marker
              id={item.no} // Unique number of given location
              key={item.no}
              title={item.name} // Used for filtering items mechanism in App.js
              name={item.name}
              onClick={this.markerClicked}
              position={{
                lat: item.position.lat,
                lng: item.position.lng
              }}
              animation={
                this.state.animateMarker === true &&
                this.props.google.maps.Animation.BOUNCE // Animation presented on https://developers.google.com/maps/documentation/javascript/examples/marker-animations
              }
              icon={{
                url:
                  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              }} // Icon used from https://developers.google.com/maps/documentation/javascript/examples/icon-simple
            />
          );
        })}

        <InfoWindow
          // Building locations information windows
          marker={this.state.activeMarker}
          onOpen={this.windowOpened}
          visible={this.state.showingInfoWindow}
        >
          <div
            className="window-open"
            role="tooltip"
            aria-label="Displays information about chosen location"
            onError="alert('Oops, there was an error with showing you the details.')"
          >
            <h2>{this.state.selection.name}</h2>
            <p>{this.state.extract}</p>
            <p>
              <strong>Read more on:</strong>
            </p>
            <a className="redirect" href={this.state.wikiLink} tabIndex="0">
              Wikipedia
            </a>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDBE2r_7RpfEqvgqfHt-qTWMpZ94i3huGQ"
})(MapContainer);
