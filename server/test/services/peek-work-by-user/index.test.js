'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('peek-work-by-user service', function() {
  it('registered the peek-work-by-users service', () => {
    assert.ok(app.service('peek-work-by-users'));
  });
});
