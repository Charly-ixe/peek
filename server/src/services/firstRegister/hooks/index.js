'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

const test = function() {
  console.log("test function");
}

const sendRegistrationEmail = function () {
  return function (hook) {
      console.log("send email");
      console.log(hook.data.user_email);
      var email = {
         from: 'benjamin@peek.com',
         to: hook.data.user_email,
         subject: 'Retrouvez vos oeuvres en activant votre compte ! 🎨',
         html: 'This is the email body'
      };

      hook.app.service('mailer').create(email).then(function (result) {
        console.log('Sent email', result);
      }).catch(err => {
        console.log(err);
      });
      return Promise.resolve(hook)
  }
}

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    sendRegistrationEmail()
  ],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
