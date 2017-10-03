const display = require('./display');

let notificationTimeout;

const notify = (message) => {
  clearTimeout(notificationTimeout);
  
  display.lightsOn();
  display.writeLines(message);
  notificationTimeout = setTimeout(() => {
    display.lightsOff();
    display.clear();
  }, 5000);
};

module.exports = {
  notify
};
