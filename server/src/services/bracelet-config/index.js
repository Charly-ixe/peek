'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'bracelet-configs.db'),
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
  app.use('/bracelet-configs', service(options));

  // Get our initialize service to that we can bind hooks
  const bracelet-configService = app.service('/bracelet-configs');

  // Set up our before hooks
  bracelet-configService.before(hooks.before);

  // Set up our after hooks
  bracelet-configService.after(hooks.after);
};
