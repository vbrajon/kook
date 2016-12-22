#!/usr/bin/env node

var transform = r =>
  Object.assign({
    aggregateRating: {
      ratingValue: '-1',
      reviewCount: '0'
    },
    recipeInstructions: ''
  }, {
    objectID: r.id.split('_')[1],
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
      link: 'http://www.marmiton.org/recettes/[].aspx'.replace('[]', r.id),
    }
  })

var sort = (a, b) => {
  if (a.rating > b.rating) return -1
  if (a.rating < b.rating) return 1
  if (a.review > b.review) return -1
  if (a.review < b.review) return 1
  if (a.date_published > b.date_published) return -1
  if (a.date_published < b.date_published) return 1
  return 0
}

console.log('### Loading files')
var recipes = require('./marmiton-recipes-raw.json')
  .map(transform)
  .sort(sort)

console.log('### Saving recipe file')
fs.writeFileSync('./marmiton-recipes.json', JSON.stringify(recipes))
