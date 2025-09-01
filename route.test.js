const assert = require('assert');
const { optimizeRoute } = require('./route.js');

const locations = [
  { lat: 0, lng: 0 }, // start
  { lat: 0, lng: 2 },
  { lat: 0, lng: 1 }
];

const route = optimizeRoute(locations);
assert.strictEqual(route.length, 3);
assert.deepStrictEqual(route.map(p => p.lng), [0, 1, 2]);
console.log('route optimization test passed');
