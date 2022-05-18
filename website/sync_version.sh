#!/bin/bash

set -x

version=$1

# 默认不变更分支，直接操作
if [[ ! -z "$version" ]]
then
  echo $version
  cd $TAICHI_PATH
  git checkout $version
fi

prefixPath="docs"
if [[ ! -z "$version" && "$version" != "master" ]]
then
  cd $TAICHI_WEBSITE/website
  prefixPath="versioned_docs/version-$version"
  cp ./versioned_sidebars/default.json ./versioned_sidebars/version-$version-sidebars.json
fi

cd $TAICHI_WEBSITE/website
rm -rf ./$prefixPath
mkdir -p ./$prefixPath
rsync -avh --delete $TAICHI_MAIN/docs/lang/ $TAICHI_WEBSITE/website/$prefixPath/lang
node ./scripts/flaturl ./$prefixPath ./$prefixPath
cp -r variables ./$prefixPath/variables
rsync -avh --delete $TAICHI_MAIN/docs/variable.json $TAICHI_WEBSITE/website/$prefixPath/variables/variable.json
rsync -avh --delete $TAICHI_MAIN/docs/fragments/ $TAICHI_WEBSITE/website/$prefixPath/fragments
