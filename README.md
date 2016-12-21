---

kook
/kuːk/
noun NORTH AMERICAN informal
a mad or eccentric person.

---

name*: string
photo*: img
time*: string
yield*: string
ingredients*: array<string>
instructions*: array<string>

prep_time: string
cook_time: string
tags: array<string>
- diets >
- cuisines >
- technique >
- meal types >
- dish types >
- occasion >

author: string
reviews: array<int>
notes: array<string>
equipments: array<string>
likes: int

metadata: array<string>
- website: string
- link: string

---

- http://cooking.nytimes.com/search?q=&filters[special_diets][]=vegetarian
- NYTimes Content Types: Collections, Guides, Recipes, Pages (Dedicated like > http://cooking.nytimes.com/christmas)
- NYTimes Recipe Tags: related, diets, cuisines, preparation methods, meal types, more
- http://www.epicurious.com/search/?content=recipe&sort=highestRated
- Epicurious Content Types: Recipes, Articles, Guides, Menus, Galleries, Videos
- Epicurious Recipe Tags: popular, meal & course, dish type, dietary concerns, ingredient, cuisine, holiday, technique
- http://www.yummly.co/recipes?q=&allowedCuisine=cuisine^cuisine-american # duckduckgo recipes display
- Yummly Content Types: Recipes
- Yummly Recipe Tags: ingredients, tastes, diets, allergies, nutrition, techniques, cuisines, time
- Seasonal, Popular, Quick & Easy

---

- http://www.marmiton.org/
- http://www.finecooking.com/browseall.aspx
- http://www.bbcgoodfood.com/recipes
- http://lookandcook.com/
- http://allrecipes.com/

---

```bash
# Marmiton
./marmiton-scrap.sh # generates marmiton-recipes-raw.json
./marmiton-transform.js # generates marmiton-recipes.json
npm install algolia
./marmiton-algolia.js # uploads marmiton-recipes.json
```

---
