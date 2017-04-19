'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('peeks service', function() {
  it('registered the peeks service', () => {
    assert.ok(app.service('peeks'));
  });
});
