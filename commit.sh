#!/usr/bin/env sh

# abort on errors
set -e

git add .
git commit -m "$*"
git push origin master

sh deploy.sh "$*"
