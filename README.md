# Vue/Webpack alongside project boilerplate

> wip!

A project boilerplate including Vue (say, for a demo page).

## Use case

You primarily developing your own project with separate bundle settings, but you want to use Vue alongside, i.e for demos

The vue client is great and you should **always** use it when you plan a fully fledged Vue app.
However when you use Vue inside an independent project the tooling around the *.`vue` components gets sometimes in your way.


## Features

* Main
    - vue 2.x
    - vue router
    - muicss

* Development
    - webpack 2.x (devServer, watch, extractTextPlugin, hotLoading for vue)
    - babel (es2015 preset)
    - eslint (airbnb-base preset, extendable)
    - saas

* Test
    - mocha && chai

## Build Setup


install

```
npm install
```

~~serve with hot reload at localhost:8080~~

> Unfortunately devServer is currently not able to handle multiple targets. Hopefully this is resolved soon. [See this issue](https://github.com/webpack/webpack-dev-server/issues/641)*

```
## npm run dev
npm run build
```


build for production with minification

```
npm run build
```

run tests

```
npm run test
```

## Concept

The boilerplate is taking advantage of Webpack2's capability to process multiple tasks.
This allows you to bundle your project and the vue app independently.

```javascript

// webpack.config.js
module.exports = [projectTask, demoTask];

```

* projectTask contains a small example APi which is bundled as an `umd` library.

* demTask is an extended version of the [webpack-simple template](https://github.com/vuejs-templates/webpack-simple)

## Structure

```
[root]
  |
  |__ [dist] // build target
  |     |
  |     |__ [demo] // vue page
  |     |
  |     |__ my-project.js
  |
  |__ [src] // develop
  |     |
  |     |__ [demo] // vue page
  |     |     |
  |     |     |__ ...
  |     |     |
  |     |     |__ main.js // webpack entry file
  |     |
  |     |__[lib] // your project
  |           |
  |           |__ ...
  |           |
  |           |__ eslintrc.js // custom linter config
  |           |
  |           |__ my-project.js // webpack entry file
  |
  | // bundle
  |
  |__ webpack.task-demo.js // webpack.config for demo page
  |
  |__ webpack.task-project.js // webpack.config for your project (umd as an example)
  |
  |__ webpack.config.js // exports above bundling tasks and jinjects my-project into page

// index html

    <script src="./dist/my-api.js"></script>
    <script src="./dist/demo/build.js"></script>

```

### Customize

1. Define library name and locations in the `webpack-tasks/project-*.js`

```
const PROJECT = {
    slug: 'my-api',         // change file name slug
    name: 'MyApi',          // change your library name
    srcDir: './src/lib/'    // change the ./src subfolder
};
```
2. delete `dist` folder

3. run `npm run build`

### Remove muicss

```bash
npm uninstall muicss --save-dev
```
remove references in demo `main.scss`

### Remove vue-router

```bash
npm uninstall vue-router --save-dev
```

remove references in demo `main.js`


Dev notes

```bash
# eslint: yes you need all
npm install --save-dev eslint eslint-loader babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-html
# sass:
npm install --save-dev sass-loader node-sass style-loader extract-text-webpack-plugin
```
