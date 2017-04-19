'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('getPeeksByUser service', function() {
  it('registered the getPeeksByUsers service', () => {
    assert.ok(app.service('getPeeksByUsers'));
  });
});
