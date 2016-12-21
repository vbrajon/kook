#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

var transform = filepath => {
  var file = require(path.resolve(dirpath + filepath))
  var id = filepath.replace('.json', '')
  var r = Object.assign({
    aggregateRating: {
      ratingValue: '-1',
      reviewCount: '0'
    },
    recipeInstructions: ''
  }, file)

  return {
    objectID: id.split('_')[1],
    name: r.name,
    thumbnail: 'https://vbrajon.imagefly.io/w_150,h_100/' + r.image, // HACK https
    image: r.image,
    date_published: r.datePublished,
    rating: +r.aggregateRating.ratingValue,
    review: +r.aggregateRating.reviewCount,
    time_prep: r.prepTime,
    time_cook: r.cookTime,
    time_total: r.totalTime,
    yield: r.recipeYield,
    ingredients: r.recipeIngredient,
    instructions: r.recipeInstructions.trim().split('.').filter(x => x),
    metadata: {
      website: 'Marmiton',
      link: 'http://www.marmiton.org/recettes/[].aspx'.replace('[]', id),
    }
  }
}

console.log('### Loading files')
var dirpath = './marmiton/raw/'
var files = fs
  .readdirSync(dirpath)
  .map(transform)
  .sort((a, b) => {
    if (a.rating > b.rating) return -1
    if (a.rating < b.rating) return 1
    if (a.review > b.review) return -1
    if (a.review < b.review) return 1
    if (a.date_published > b.date_published) return -1
    if (a.date_published < b.date_published) return 1
    return 0
  })

console.log('### Saving recipe file')
var filepath = './marmiton/recipes.json'
fs.writeFileSync(filepath, JSON.stringify(files))
