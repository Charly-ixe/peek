'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'peek-work-by-users.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/peek-work-by-users', service(options));

  // Get our initialize service to that we can bind hooks
  const peek-work-by-userService = app.service('/peek-work-by-users');

  // Set up our before hooks
  peek-work-by-userService.before(hooks.before);

  // Set up our after hooks
  peek-work-by-userService.after(hooks.after);
};
