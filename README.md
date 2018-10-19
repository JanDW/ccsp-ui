# ccsp-prototype

## Getting started

_Note: all commands assume you are in the project repo root folder._

### Dependencies

```bash
npm install
```

### API

The prototype runs on a mock API. The code to create the JSON file is contained in `make-api.js`. This file uses [faker.js](https://github.com/marak/Faker.js/) to generate the values for the keys.

The output is written to `api.json` and can be easily be regenerated by running the following command in the terminal. Of course, a version of this file is checked into the repository, so this step isn't required. Regeneration will completely change the contents of the `api.json` file, but will maintain the structure. (Duh.)

To regenerate the `api.json` file

```bash
npm run-script make-api
```

To start the mock JSON API server consuming the `api.json` file

```bash
npm run-script serve-api
```

Or live life to the fullest and combine `make-api` and `serve-api` by running

```bash
npm run-script api
```


This should start the server on `localhost:3000`.

The output in the terminal will show the available API resources (i.e. employees, spouses, children, applications, awards). For more information on what the API server can do, consult the [json-server README.md file](https://github.com/typicode/json-server). Spoiler alert: _pagination, filtering, search, routing, slicing, etc._ are available, as are the _GET, PUT, POST, PATCH, DELETE_ HTTP methods.

Operators can be tacked on as query parameters. E.g. This call to `employees` will return the third page (collection sliced by 10 items/page) of the collection with the "id referenced" _children_, _spouse_, and _applications_ items embedded in the JSON.

```
http://localhost:3000/employees?_embed=children&_embed=applications&_embed=spouses&_page=3
```

### The AngularJS webapp

At the time of writing, I'm starting to develop this in AngularJS (it's outdated, but I need to learn it for another project). I've completed the [employee-facing new application form](https://github.mit.edu/jandw/ccsp-experiment/blob/b649b573de8bf97e7938c4ee75bdd545eae3286d/new-application.html) using jQuery, and it will not be overhauled. Currently the [admin-facing new applications inbox](https://github.mit.edu/jandw/ccsp-experiment/blob/b649b573de8bf97e7938c4ee75bdd545eae3286d/admin-inbox.html) and [admin-facing application detail view (WIP)](https://github.mit.edu/jandw/ccsp-experiment/blob/b649b573de8bf97e7938c4ee75bdd545eae3286d/admin-application.html) are also using jQuery, but they're likely to be recreated in the AngularJS app.

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
