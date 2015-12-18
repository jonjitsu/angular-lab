'use strict';

describe('jonsContacts.version module', function() {
  beforeEach(module('jonsContacts.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
