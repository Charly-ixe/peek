'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('addPeek service', function() {
  it('registered the addPeeks service', () => {
    assert.ok(app.service('addPeeks'));
  });
});
