'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('bracelet-config service', function() {
  it('registered the bracelet-configs service', () => {
    assert.ok(app.service('bracelet-configs'));
  });
});
