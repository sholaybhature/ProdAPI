Run this command on Linux, change -n for larger or smaller file sizes.

tr -dc "A-Za-z 0-9" < /dev/urandom | fold -w100|head -n 15000000 > output.txt
