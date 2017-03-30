'use strict';
const peekWorkByUser = require('./peek-work-by-user');
const braceletConfig = require('./bracelet-config');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(braceletConfig);
  app.configure(peekWorkByUser);
};
