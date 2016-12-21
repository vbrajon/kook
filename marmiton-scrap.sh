#!/bin/bash

# curl -Ss -L 'http://www.marmiton.org/recettes/recherche.aspx?pht=1' > marmiton-search.html
# curl -Ss -L 'http://www.marmiton.org/recettes/recette_biscuits-craqueles-au-chocolat_342953.aspx' > marmiton-recipe.html

mkdir -p marmiton/raw && cd marmiton/raw
SEARCH='curl -Ss -L http://www.marmiton.org/recettes/recherche.aspx?pht=1&start={}'
SEARCH_RANGE=$(seq 0 10 26000) # {0..26000..10}
SEARCH_PARSE='pup .m_titre_resultat a attr{href}'
LINK_FILE='marmiton-links.txt'
RECIPE_REGEX='sed s/\/recettes\/\(.*\).aspx/\1/'
RECIPE='curl -Ss http://www.marmiton.org/recettes/[].aspx | pup script[type="application/ld+json"] text{} | tr -d "\n" | jq "." > [].json'

parallel -j0 -q $SEARCH ::: $SEARCH_RANGE | $SEARCH_PARSE > $LINK_FILE
cat $LINK_FILE | $RECIPE_REGEX | parallel -j0 -I[] $RECIPE

mv $LINK_FILE ..
mkdir -p ../empty
find . -name "*.json" -size 0 | xargs -n1 -I{} mv {} ../empty/
