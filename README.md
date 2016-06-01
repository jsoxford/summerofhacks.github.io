The summerofhacks.io website
===================

Summer of Hacks is an event series organised and run by [JSOxford](http://jsoxford.com).

[![Build Status](https://travis-ci.org/jsoxford/summerofhacks.github.io.svg?branch=develop)](https://travis-ci.org/jsoxford/summerofhacks.github.io) [![Slack Status](https://digitaloxford.herokuapp.com/badge.svg)](https://digitaloxford.herokuapp.com) (channel: `#soh`)

This is a web site.  You can run it locally with these commands

```bash

# install the gulp task runner thing
npm install --global gulp

# install the project dependencies
npm install

# run a web server on localhost:8080
gulp
```

If you want to deploy changes to the live site, run this:

```bash
gulp deploy
```

Though you shouldn't need to, we build automatically on Travis.

We'd love for you to make the site prettier/faster/more accessible, just fork and create a pull request (and check out our [contribution guidelines](CONTRIBUTING.md).

### Travis

We continuously build the site using [TravisCI](http://travis-ci.org). The config is in `.travis.yml`. If you're porting this code to a new repository you'll also need to replace the two encrypted environment variables:

```bash
travis encrypt GH_LOGIN=YOUR_GITHUB_USERNAME --add
travis encrypt GH_TOKEN=YOUR_APPLICATION_TOKEN --add
```
