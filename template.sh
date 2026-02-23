# generate the theme.json
set -x
# todo: read colors from palette.html
theme_fg=ffffff
theme_bg=000000
theme_ag=4000ff
# terminal colors
theme_dk=000000
theme_dr=cd0000
theme_dg=00aa44
theme_dy=cdcd00
theme_db=5c5cff
theme_dm=cd00cd
theme_dc=00afbf
theme_dw=cdcdcd
theme_lk=7f7f7f
theme_lr=ff0000
theme_lg=00dd66
theme_ly=ffff00
theme_lb=6495ed
theme_lm=ff00ff
theme_lc=00e0ff
theme_lw=ffffff
# syntax colors
theme_ss=ff4444
theme_sv=00dd66
theme_sf=5c5cff
theme_st=00e0ff
theme_sn=6495ed
theme_sp=66dd00
theme_sc=ffdd00

# theme variables
sed "$1" \
	-e "s/<fg>/$theme_fg/g" \
	-e "s/<bg>/$theme_bg/g" \
	-e "s/<ag>/$theme_ag/g" \
	-e "s/<dk>/$theme_dk/g" \
	-e "s/<dr>/$theme_dr/g" \
	-e "s/<dg>/$theme_dg/g" \
	-e "s/<dy>/$theme_dy/g" \
	-e "s/<db>/$theme_db/g" \
	-e "s/<dm>/$theme_dm/g" \
	-e "s/<dc>/$theme_dc/g" \
	-e "s/<dw>/$theme_dw/g" \
	-e "s/<lk>/$theme_lk/g" \
	-e "s/<lr>/$theme_lr/g" \
	-e "s/<lg>/$theme_lg/g" \
	-e "s/<ly>/$theme_ly/g" \
	-e "s/<lb>/$theme_lb/g" \
	-e "s/<lm>/$theme_lm/g" \
	-e "s/<lc>/$theme_lc/g" \
	-e "s/<lw>/$theme_lw/g" \
	-e "s/<ss>/$theme_ss/g" \
	-e "s/<sv>/$theme_sv/g" \
	-e "s/<sf>/$theme_sf/g" \
	-e "s/<st>/$theme_st/g" \
	-e "s/<sn>/$theme_sn/g" \
	-e "s/<sp>/$theme_sp/g" \
	-e "s/<sc>/$theme_sc/g" \
	-e 's/<!.*\?>//g' >"$2"
# trim whitespace
sed "$2" -i -e 's/\t/ /g'
while grep -Eqm1 '^[^" ]*("[^" ]*?"[^" ]*?)*? +' "$2"; do
	sed "$2" -Ei -e 's/^([^" ]*?("[^" ]*?"[^" ]*?)*?) +/\1/g'
done
# strip newlines
sed "$2" -zi -e 's/\n//g'
