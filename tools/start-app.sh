#!/bin/bash
if [ "$OS" == "Windows_NT" ]; then
  node ./tools/init-task.mjs
else
  bash -ic "node ./tools/init-task.mjs"
fi
