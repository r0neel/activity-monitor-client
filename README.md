# activity-monitor-client

<!-- badges -->
[![ISC license](https://img.shields.io/badge/License-ISC-blue.svg)](https://www.isc.org/licenses/)
[![GitHub latest commit](https://img.shields.io/github/last-commit/Ultra-Instinct-js/activity-monitor-client.svg)](https://github.com/Ultra-Instinct-js/activity-monitor-client/commit/)
[![GitHub forks](https://img.shields.io/github/forks/Ultra-Instinct-js/activity-monitor-client.svg)](https://github.com/Ultra-Instinct-js/activity-monitor-client)

## Installation & Usage

1. Clone the repo `git clone git@github.com:Ultra-Instinct-js/activity-monitor-client.git`
2. Enter the directory `cd activity-monitor-client`
3. Install dependencies `npm install`
   
* `npm start` to run the client server using [`http-server`](https://www.npmjs.com/package/http-server).
* `npm test` to run the tests contained in the `./test` directory.
* `npm run coverage` to check test coverage.
* `npm run dev` to run the client server and watch for JavaScript changes with [`watchify`](https://github.com/browserify/watchify).
* `npm run bundle` to build a JavaScript bundle using [`browserify`](https://github.com/browserify/browserify).

## Project Goal

Build a habit tracking website where users can make an account and create habits for themselves to track and update.

### Other requirements:

* Users should be able to choose the frequency that they want to track the habit.
* Users should be able to see that their habit is complete as well as their most recent completion streak.

## Design & Implementation

### Figma designs

* [Front Page](https://cdn.discordapp.com/attachments/583889254854295565/946046650344960090/unknown.png)
* [Log In / Sign Up](https://cdn.discordapp.com/attachments/583889254854295565/946044564274286592/unknown.png)
* [Tracker Page](https://media.discordapp.net/attachments/583889254854295565/946044816049963088/unknown.png)
* [New Tracker Form](https://cdn.discordapp.com/attachments/583889254854295565/946046129051676723/unknown.png)

### Architecture

* [Component Level Diagram](https://cdn.discordapp.com/attachments/941414409203486751/944315723361173544/unknown.png)

## Changelog

* Factored out habit data to be accessible by all handler functions after initial request.
* Changed habit list to use a bootstrap table instead of a list.
* Removed thick borders on default bootstrap table.
* Added toggle button to switch between sign up and log in forms.
* Changed log in to use email instead of username.
* Added validation to login/register forms.

## Fixed Bugs

- [x] No errors thrown by token decode function to be caught by handlers.
- [x] JavaScript bundler pointing to the wrong filename.
- [x] Scoping error in nav link handler function.
- [x] Updating the nav bar display makes it disappear.
- [x] Auth requests are sent to the wrong API endpoint.
- [x] Bearer prefix on token not accounted for.
- [x] Render dashboard function doesn't return anything.
- [x] Goal duration on habit form has string values instead of numbers.
- [x] Login form doesn't close after logging in.
- [x] Incorrect `Content-Type` headers on requests.

## Pitfalls & Discoveries



## Remaining Bugs



## Improvements & Future Features



## License

