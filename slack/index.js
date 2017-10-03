const Slack = require('@slack/client');

const token = require('./token');
const httpUtils = require('./httpUtils');

const RtmClient = Slack.RtmClient;
const RTM_EVENTS = Slack.RTM_EVENTS;
const WebClient = Slack.WebClient;

const web = new WebClient(token);
const rtm = new RtmClient(token, { logLevel: 'info' });
const ME = 'amatthews';

let channels = {};
let users = {};

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
  const channelId = message.channel;
  const text = message.text;
  const sender = users[message.user];

  if (message.subtype) {
    //TODO: Handle subtypes differently?
    console.log(`Subtype: ${message.subtype}`);
  }

  if (!sender) {
    console.log('Unknown sender, will not display');
    return;
  }

  if (sender === ME) {
    //return;
  }

  //Note on message IDs:
    // C, it's a public channel
    // D, it's a DM with the user
    // G, it's either a private channel or multi-person DM
  if (channelId.charAt(0) === 'D') {
    httpUtils.sendNotification('Direct Message from ' + sender);
  } else {
    httpUtils.sendNotification('Channel Message ' + channels[channelId]);
  }
});

const getChannels = () => {
  web.channels.list((err, info) => {
    if (err) {
      console.log(`Error fetching channel list: ${err}`);
    } else {
      info.channels.forEach((c) => channels[c.id] = c.name);
      web.groups.list((err, info) => {
        if (err) {
          console.log(`Error fetching group list: ${err}`);
        } else {
          info.groups.forEach((c) => channels[c.id] = c.name);
        }
      });
    }
  });
};

const getUsers = () => {
  web.users.list((err, info) => {
    if (err) {
      console.log(`Error fetching user list: ${err}`);
    } else {
      info.members.forEach((u) => users[u.id] = u.name);
    }
  })
};

const start = () => {
  getChannels();
  getUsers();
  //Gives a chance for channels and users to load. (maybe could just wait until that's done to start RTM)
  setTimeout(() => {
    rtm.start();
  }, 2000);
};

start();
