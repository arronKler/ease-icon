#!/bin/bash

cd packages/vue && yarn build && yarn link
cd ../../demo
yarn link @ease-icon/vue
