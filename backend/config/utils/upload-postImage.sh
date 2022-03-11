#!/bin/sh

curl $1 \
  -F operations='{ "query": "mutation ($file: Upload!) { uploadFile(file: $file) }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@$2