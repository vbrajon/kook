#!/usr/bin/env node

// DEPRECATED: This service is not great, imagefly.com is simpler/better

console.log('### Loading recipe file')
var filepath = './marmiton/recipes.json'
var recipes = require(filepath)

console.log('### Initializing Cloudinary')
var CLOUDINARY_CLOUDNAME = 'kook'
var CLOUDINARY_APIKEY = '696637915219562'
var CLOUDINARY_APISECRET = 'NkxnCos-wJ8m-xiWyupjAZHv93k'
var cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUDNAME,
  api_key: CLOUDINARY_APIKEY,
  api_secret: CLOUDINARY_APISECRET
})

var fs = require('fs')
var upload_recipe = r => cloudinary.uploader
  .upload(r.photo, () => {}, { public_id: "marmiton/" + r.objectID })
  .then(res => r.photo = res.secure_url)
var upload_chunk = chunk => Promise.all(chunk.map(upload_recipe))
  .then(urls => fs.writeFileSync(filepath, recipes))
  .catch(err => console.log(err))
Array.prototype.chunk = function (n) {
  if (!this.length) return []
  return [this.slice(0, n)].concat(this.slice(n).chunk(n))
}
recipes
  .chunk(1000)
  .slice(0, 2) // limit is 7500 images per month, max 75000
  .map(upload_chunk())
