const bodyParser = require('body-parser');
const express = require('express');

const validateRequest = require('./requestValidator');
const notifier = require('./notifier');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

server.get('/ping', (request, response) => {
  response.send('pong');
});

server.post('/notification', (request, response) => {
  const validationResult = validateRequest(request.body);

  if (validationResult.pass) {
    notifier.notify(request.body.message);
    response.status(200).end();
  } else {
    response.status(400).send(validationResult.reason);
  }
  
});

//Start the server
server.listen('8080', () => {
  console.log('Server listening on port 8080');
});
