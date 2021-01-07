# Introduction

Ease-Icon is a icon lib producer, which means you can generate icon libs easily and deploy those libs in your personal or public npm registry. You just need three steps to use.

1. Create new folder in `source` folder and add your SVG icons to it.
2. `yarn build` which will build your icons into the packages.
3. Publish generated icon libs and use it in your project just like using other component libs.

# Usage

## Prerequisite

Before getting started, you should have installed these tools below.

- Yarn : Another package manager like `npm`
- @vue/cli-service : To run example
- lerna: Manage monorepo

## Full Use Steps

(1) Get your environment getting warm

```bash
yarn run bootstrap
```

(2) Create folder in source folder and add icons into it

(3) Build lib

```bash
yarn build
```

(4) Run demo site to see if it works

```bash
yarn start
```

(5) Publish you lib(s)

```bash
lerna publish
```

(6) Install and use it in your project

For example in Vue:

```javascript
import Vue from 'vue';
import Icons from '@ease-icon/vue-basic';

Vue.use(Icons);

// ... other code
```

# FAQ

## How to publish in local registry?

1. Just add `.npmrc` file and add your registry url into it.
2. Use `--registry` option to specify which registry you wanna use.
