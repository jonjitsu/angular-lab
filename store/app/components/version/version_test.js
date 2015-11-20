'use strict';

describe('store.version module', function() {
  beforeEach(module('store.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
