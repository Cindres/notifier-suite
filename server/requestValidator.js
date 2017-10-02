module.exports = (request) => {
  if (!request.source) {
    return buildResponse(false, 'Notification missing source.');
  }

  if (!request.message) {
    return buildResponse(false, 'Notification missing message.');
  }

  if (request.message.length > 48) {
    return buildResponse(false, 'Message length longer than 48 characters.');
  }

  return buildResponse(true, '');
};

const buildResponse = (pass, reason)  => {
  return { pass, reason };
};
