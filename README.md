# ccsp-prototype

## Getting started

### Dependencies

From the project rootfolder, install the dependencies

```bash
npm install
```

### API

The prototype runs on a mock API. The JSON file can be regenerated

```bash
node app/api.js
```

To serve the file as an API run

```bash
 json-server --watch app/api.json
```

This should start the server on `localhost:3000`. The output in the terminal will show the available resources. More information on what the API can do, consult the [json-server README.md file](https://github.com/typicode/json-server).

Options such as _pagination, filtering, search, routing, slicing, etc._ are available, as are the _GET, PUT, POST, PATCH, DELETE_ HTTP methods. As well as useful operators e.g. This call to `employees` will give you the third page (10 items returned by default) with the "id referenced" _children_, _spouse_, and _applications_ items embedded in the JSON.

```
http://localhost:3000/employees?_embed=children&_embed=applications&_embed=spouses&_page=3
```

A convenience shell script is available

```bash
./generateApiJson.sh
```

It generates the JSON, and, if successful, proceeds starts up the server.
