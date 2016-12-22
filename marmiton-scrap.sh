#!/bin/bash

# NOTE: Escape '&' manually or with parallel -q
# NOTE: parallel -I option is available in mac parallel and not in more-utils :(
SEARCH='curl -Ss -L http://www.marmiton.org/recettes/recherche.aspx?pht=1\&start=[]'
RECIPE='curl -Ss -L http://www.marmiton.org/recettes/[].aspx'

parallel -j0 -I[] $SEARCH ::: $(seq 0 10 30) | pup '.m_titre_resultat a attr{href}' | sed 's/\/recettes\/\(.*\).aspx/\1/' > marmiton-recipes-links.txt
parallel -j0 -I[] $RECIPE :::: marmiton-recipes-links.txt | pup 'script[type="application/ld+json"] text{}' > marmiton-recipes-raw.txt

cat marmiton-recipes-raw.txt | tr -d '[:cntrl:]' | sed 's/$/\n/' | jq -s '.' > marmiton-recipes-raw.json
