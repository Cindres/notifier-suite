const request = require('request');

const sendNotification = (message) => {
  request({
    method: 'POST',
    uri: 'http://localhost:8080/notification',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({source: 'slack', message})
  },
  (err, response, body) => {
    if (response.statusCode != 200) {
      console.log(body);
    }
  })
};

module.exports = {
  sendNotification
};
