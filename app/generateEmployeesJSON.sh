#!/bin/bash
ECHO "Using node to run api.js in order to create api.json..."
node api.js && json-server --watch api.json
