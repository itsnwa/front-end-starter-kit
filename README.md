# Front-end Starter Kit

Opinionated from top to bottom.

# Getting Started

### Install all dependencies

`$ bundle install` and `$ npm install`

### Run local development server

Run `$ gulp` to start the server, a new browser window/tab automatically opens on `localhost:3000`

### Folder structure

The only folder you need to think about is the `./src` folder, all your content should go in here.
Make sure you follow the folder structure to ensure that all files get processed in the task runner.

```
front-end-starter-kit/
|
|- src/
|  |- index.html ___________________ # Entry point
|
|  |- css/
|    |- main.css ___________________ # Main CSS file, only imports
|    |- partials/
|       |-  _base.css________________ # Base styles
|       |-  _variables.css___________ # Variables
|       |-  ...______________________ # Add your own components here
|
|  |- images/
|     # Put all your images here, including content images
|
|  |- js/
|    |- main.js ____________________ # Main JS
```

# Based on

- jekyll
- gulp
- browsersync
- modernizer
- postcss
  - nextcss
  - autoprefixer
  - precss
  - pxtorem
  - lost
- cssnano
- imagemin
- uglifyjs
