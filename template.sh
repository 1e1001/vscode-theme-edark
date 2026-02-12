# generate the theme.json
set -x
# theme variables
sed "$1" -e "s/<fg>/$3/g" -e "s/<bg>/$4/g" -e "s/<accent>/$5/g" -e 's/<!.*\?>//g' >"$2"
# trim whitespace
sed "$2" -i -e 's/\t/ /g'
while grep -Eqm1 '^[^" ]*("[^" ]*?"[^" ]*?)*? +' "$2"; do
	sed "$2" -Ei -e 's/^([^" ]*?("[^" ]*?"[^" ]*?)*?) +/\1/g'
done
# strip newlines
sed "$2" -zi -e 's/\n//g'
