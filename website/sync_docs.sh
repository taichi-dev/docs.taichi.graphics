#!/bin/bash

set -x

cd $TAICHI_WEBSITE/website
yarn install

if [ "$1" != "dev" ]
then
  yarn run genversions

  for version in $(cat versions.json | jq -r '.[]'); do
    echo $version
    cd $TAICHI_PATH
    git checkout $version
    cd $TAICHI_WEBSITE/website
    rm -rf ./versioned_docs/version-$version
    mkdir -p ./versioned_docs/version-$version
    rsync -avh --delete $TAICHI_MAIN/docs/lang/ $TAICHI_WEBSITE/website/versioned_docs/version-$version/lang
    node ./scripts/flaturl ./versioned_docs/version-$version ./versioned_docs/version-$version
    cp -r variables ./versioned_docs/version-$version/variables
    rsync -avh --delete $TAICHI_MAIN/docs/variable.json $TAICHI_WEBSITE/website/versioned_docs/version-$version/variables/variable.json
    rsync -avh --delete $TAICHI_MAIN/docs/fragments/ $TAICHI_WEBSITE/website/versioned_docs/version-$version/fragments
    cp ./versioned_sidebars/default.json ./versioned_sidebars/version-$version-sidebars.json
  done
fi

cd $TAICHI_PATH
git checkout master
cd $TAICHI_WEBSITE/website
rm -rf docs
mkdir -p $TAICHI_WEBSITE/website/docs/lang
rsync -avh --delete $TAICHI_MAIN/docs/lang/ $TAICHI_WEBSITE/website/docs/lang
node ./scripts/flaturl ./docs ./docs
cp -r variables ./docs/variables
rsync -avh --delete $TAICHI_MAIN/docs/variable.json $TAICHI_WEBSITE/website/docs/variables/variable.json
rsync -avh --delete $TAICHI_MAIN/docs/fragments/ $TAICHI_WEBSITE/website/docs/fragments
rm -rf .tmpdocs