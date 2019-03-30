# negsnel
Javascript port of [Pat Hooper](http://wphooper.com/)'s original Java program,
written c. 2012/2013 for use during Summer@[ICERM](https://icerm.brown.edu).
Runs at http://awstlaur.github.io/negsnel/

Aided research, culminating in: https://arxiv.org/abs/1502.02053

## Development
- `yarn` will install the dev dependencies (needs [Yarn](https://yarnpkg.com/en/))
  - `npm install` will also work, just don't commit any `package-lock.json` it creates
- `npm run start:dev` will load up the webpack dev server, and watch for file
changes
- `npm lint` will run eslint on all js files
