'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('firstRegister service', function() {
  it('registered the firstRegisters service', () => {
    assert.ok(app.service('firstRegisters'));
  });
});
