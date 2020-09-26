# Trivial script to batch convert rst to md using pandoc
FILES=./ori/docs/*.rst
for f in $FILES
do
  filename="${f%.*}"
  echo "Converting $f to $filename.md"
  `pandoc $f -f rst -t markdown -o $filename.md`
done
