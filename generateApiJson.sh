#!/bin/bash
ECHO "Using node to run api.js in order to create api.json..."
node app/api.js && json-server --watch app/api.json
