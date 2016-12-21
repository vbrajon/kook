#!/bin/bash

SEARCH='curl -Ss -L http://www.marmiton.org/recettes/recherche.aspx?pht=1&start={}'
SEARCH_RANGE=$(seq 0 10 26000) # {0..26000..10}
SEARCH_PARSE='pup .m_titre_resultat a attr{href}'
RECIPE_REGEX='sed s/\/recettes\/\(.*\).aspx/\1/'
RECIPE='curl -Ss http://www.marmiton.org/recettes/[].aspx | pup script[type="application/ld+json"] text{} | tr -d "\n"'

parallel -j0 -q $SEARCH ::: $SEARCH_RANGE | $SEARCH_PARSE | $RECIPE_REGEX | parallel -j0 -I[] $RECIPE | jq -s '.' > marmiton-recipes-raw.json
