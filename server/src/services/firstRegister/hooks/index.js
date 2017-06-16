'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const EmailTemplate = require('email-templates').EmailTemplate
const path = require('path')

const templateDir = path.join(__dirname, 'template')
const newsletter = new EmailTemplate(templateDir)

const sendRegistrationEmail = function () {
  return function (hook) {
      console.log("send email");
      console.log(hook.data.user_email);
      newsletter.render(function (err, result) {
        var email = {
          from: 'hello@peek-expo.com',
          to: hook.data.user_email,
          subject: 'Expérience Peek 🖼 de la Bpi',
          html: result.html
        };

        hook.app.service('mailer').create(email).then(function (result) {
          console.log('Sent email', result);
        }).catch(err => {
          console.log(err);
        });
        return Promise.resolve(hook)
      })
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
