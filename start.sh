#!/bin/sh
set -e

if [ $NODE_ENV = "production" ]; then
  node dist/index.js;
else
  nodemon --exec babel-node src/index.js;
fi