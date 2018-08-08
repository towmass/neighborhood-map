# Neighborhood Map Project

This browser-based app allows you to browse and filter author's favorite places when he visited New York City a few years ago.

This is a Udacity student's project, therefore Udacity lessons were used in process of learning given topics and developing this app, meaning some parts of a code may correspond to the previous projects from the FEND course, in which "coding alongside with the tutor" method was applied.

Student's goal for this project was to successfully implement obtained information from the whole FEND Udacity Course and show an ability to assess and meet given requirements in a complex and correct manner.

## Table of Contents

- [How To Install](#how_to_install)
- [Dependencies](#dependencies)
- [Used APIs](#used_apis)
- [Contributing](#contributing)

## How To Install

To run this app :

1.  Clone/download this [repository](https://github.com/towmass/neighborhood-map) and run your favorite browser (Chrome, Firefox etc.)

2.  Install Create React App package through the terminal: `npm install -g create-react-app`

3.  To start your session, run the following command in your terminal: `npm start`

4.  The app will open in your browser on the address: `localhost:3000`

5.  To install the last required package (google-maps-react), run the following command in your terminal: `npm install --save google-maps-react`

Note: This app includes ServiceWorker as well, it is provided by create-react-app and implement its functionality, it is necessary to deploy the app online. Also, you can run `npm run build` and `serve -s build`.

## Dependencies

App dependencies are:

- [NPM](https://www.npmjs.com/)
- [Create-react-app](https://github.com/facebook/create-react-app)
- [Google-maps-react](https://www.npmjs.com/package/google-maps-react)
- [Prop-types](https://www.npmjs.com/package/google-maps-react)
- [Escape String RegExp](https://www.npmjs.com/package/escape-string-regexp)

## Used APIs

This app uses:

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
- [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page)

## Contributing

This project was made as a part of Udacity FEND Course 2018. Therefore, the author most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
