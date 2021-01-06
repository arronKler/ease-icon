#!/bin/bash

cd packages/compiler && yarn run build
yarn link
cd ../..

yarn link @ease-icon/compiler

cd demo
yarn install