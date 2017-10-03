module.exports = (request) => {
  if (!request.source) {
    return buildResponse(false, 'Notification missing source.');
  }

  if (!request.message) {
    return buildResponse(false, 'Notification missing message.');
  }
  
  if (request.message.length > 3) {
    return buildResponse(false, 'Cannot send more than 3 lines for notification.');
  }
  
  for (let i = 0; i < request.message.length; i++) {
    if (request.message[i].length > 16) {
      return buildResponse(false, 'A single line cannot be more than 16 characters in length');
    }
  }
    
  return buildResponse(true, '');
}

const buildResponse = (pass, reason)  => {
  return { pass, reason };
};
