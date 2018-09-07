#!/bin/sh
set -e

DIST="dist"

# creates a clean dir for dist
cleanDist() {
  echo "Preparing dist..." 

  if [[ -d $1 ]]; then
    rm -rf $1
  fi

  return 1
}

cleanDist $DIST
echo "Done!"

exit