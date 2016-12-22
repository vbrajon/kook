#!/usr/bin/env node

console.log('### Loading recipe file')
var recipes = require('./marmiton-recipes.json')

console.log('### Initializing Algolia')
var ALGOLIA_INDEXNAME = 'kook'
var ALGOLIA_APPID = 'HTHQ95I057'
var ALGOLIA_APIKEY = 'f3faf49ae2bf389efe226b483ffb8637'
var algoliasearch = require('algoliasearch')
var client = algoliasearch(ALGOLIA_APPID, ALGOLIA_APIKEY)
var index = client.initIndex(ALGOLIA_INDEXNAME)
var settings = {
  customRanking: [
    'desc(rating)',
    'desc(review)',
    'desc(date_published)',
  ],
  searchableAttributes: [
    'name',
    'instructions',
    'ingredients',
  ],
  attributesForFaceting: [
    'ingredients',
    'metadata.website',
    'time_total',
    'yield',
  ]
}
index.setSettings(settings)
  .then(() => console.log('SUCCESS: setSettings'))
  .catch(() => console.log('ERROR: setSettings'))

var upload_chunk = (chunk, i) => index.addObjects(chunk)
  .then(() => console.log('SUCCESS: addObjects' + ' - chunk ' + i))
  .catch(() => console.log('ERROR: addObjects' + ' - chunk ' + i))
Array.prototype.chunk = function (n) {
  if (!this.length) return []
  return [this.slice(0, n)].concat(this.slice(n).chunk(n))
}

recipes
  .chunk(1000)
  .slice(0, 10)
  .map(upload_chunk)
