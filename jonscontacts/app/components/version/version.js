'use strict';

angular.module('jonsContacts.version', [
  'jonsContacts.version.interpolate-filter',
  'jonsContacts.version.version-directive'
])

.value('version', '0.1');
