#!/bin/bash
set -e

# create db
setupDb() {
  echo "Setting up db..."
  
  psql
}

# install dependencies
installDeps() {
  echo "Installing deps..."
  npm install
  
  return 1
}

installDeps && setupDb
echo "Done!!!"
exit