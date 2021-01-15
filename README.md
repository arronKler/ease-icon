# Introduction

Ease-Icon is a icon lib producer, which means you can generate icon libs easily and deploy those libs in your personal or public npm registry.

Ease-Icon support three types of icon schema：

1. iconfont
2. SVG Sprites
3. Vue lib

# Usage

## Setup

Install command-line tool first.

```bash
npm install ease-icon-cli -g
```

After installed cli tool, init a new icon project.

```bash
eicon init demo-icon
```

After initiation, install dependecies.

```bash
cd demo-icon && npm install
```

## Usage

(1) add new folder in source folder.

```bash
mkdir source/Common
```

> Notice: we recommand to use word with CamelCase as new folder name.

(2) Copy your svg icons which have exported from tools like Skecth、figma and so on，to the new folder you created.

example:

```bash
cp ~/CloseDoor.svg ./source/Common/CloseDoor.svg
```

> Notice: we recommand to use word with CamelCase as svg filename

(3) Build lib

Build iconfont or SVG sprites

```bash
eicon build Common -t iconfont
```

Build vue lib

```bash
eicon build Common
```

If you don't pass the folder name you just created, eicon will build all folders under source folder.

(4) Run a service to check demo

Config your lib in demo/src/source_config.js

```javascript
export default {
  Common: { title: 'Common Icons' },
};
```

Then serve it:

```bash
npm run serve
```

(5) Publish you lib(s)

> Notice: before publish package, login to the npm registry first with `npm login`

```bash
eicon publish Common
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
