/* jshint node: true */

const jsonServer = require('json-server');
const nocache = require('nocache');
const opn = require('opn');
const server = jsonServer.create();
const router = jsonServer.router('api.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.use(nocache());
server.listen(3000, () => {
  console.log('JSON Server is running.');
  opn('http://localhost:3000');
});
