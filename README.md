# ccsp-prototype

## Getting started

_Note: all commands assume you are in the project repo root folder._

### Dependencies

```bash
npm install
```

### API

The mock API is in a [separate repository](https://github.com/jandw/ccsp-api), and is served via Heroku so the [application can still be served via github pages](https://jandw.github.io/ccsp-ui).

### The AngularJS webapp

At the time of writing, I'm starting to develop this in AngularJS (it's outdated, but I need to learn it for another project). I've completed the [employee-facing new application form](https://github.com/JanDW/ccsp-ui/blob/772edb386dda225202d7379ab4a566f220fa1530/employee-ui/new-application.html) using jQuery, and it will not be overhauled.

Anyway, here's how you start up the AngularJS app

```bash
open http://localhost:8000; npm start
```
On MacOS your default browser should open the URL, but you'll need to reload the page manually.

### Troubleshooting

Having unexpected errors thrown when running commands in the terminal that on node dependencies?
Try:

```bash
rm -rf node_modules/ && npm clean cache && npm install
```
