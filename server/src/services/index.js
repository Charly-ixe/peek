'use strict';
const firstRegister = require('./firstRegister');
const peeks = require('./peeks');
const getPeeksByUser = require('./getPeeksByUser');
const addPeek = require('./addPeek');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(addPeek);
  app.configure(getPeeksByUser);
  app.configure(peeks);
  app.configure(firstRegister);
};
