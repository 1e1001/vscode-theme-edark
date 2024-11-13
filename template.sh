# generate the theme.json
set -x
# theme variables
sed template.json -e "s/<fg>/$1/g" -e "s/<bg>/$2/g" -e "s/<accent>/$3/g" -e 's/<!.*\?>//g' >theme.json
# trim whitespace
while grep -Eqm1 '^[^" ]*("[^" ]*?"[^" ]*?)*? +' theme.json; do
	sed theme.json -Ei -e 's/^([^" ]*?("[^" ]*?"[^" ]*?)*?) +/\1/g'
done
# strip newlines
sed theme.json -zi -e 's/\n//g'
