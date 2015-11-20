'use strict';

angular.module('store.version', [
  'store.version.interpolate-filter',
  'store.version.version-directive'
])

.value('version', '0.1');
