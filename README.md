# negsnel

Javascript port of [Pat Hooper](http://wphooper.com/)'s original Java program,
written c. 2012/2013 for use during Summer@[ICERM](https://icerm.brown.edu).
Runs at http://awstlaur.github.io/negsnel/

Aided research, culminating in: https://arxiv.org/abs/1502.02053

## Development

-   `yarn` will install the dev dependencies (needs [Yarn](https://yarnpkg.com/en/))
    -   `npm install` will also work, just don't commit any `package-lock.json` it creates
-   `yarn run start:dev` will load up the webpack dev server, and watch for file
    changes
-   At the moment, the build is committed to source control. It is placed in `docs/`
    for compatibility with Githup Pages
-   Run `yarn run precommit` (or `npm run precommit`). There should be no errors,
    and `git status` should only report differences if you plan _not_ to update the
    build

### Contributing

Contact me if you would like to add a feature or fix a bug, prior to putting in
significant work.
