The summerofhacks.io website
===================

Summer of Hacks is an event series organised and run by [JSOxford](http://jsoxford.com).

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jsoxford/jsoxford.github.com?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/jsoxford/summerofhacks.github.io.svg?branch=develop)](https://travis-ci.org/jsoxford/summerofhacks.github.io) [![Circle CI](https://circleci.com/gh/jsoxford/summerofhacks.github.io.svg?style=svg)](https://circleci.com/gh/jsoxford/summerofhacks.github.io)


This is a web site.  You can run it locally with these commands

```bash
cd scripts

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

We have a [Tron-ci](http://tron-ci.herokuapp.com/jobs/1519935/) job to trigger a build every day at midnight, so scheduled pages and/or any time-sensitive preprocessing can occur without us having to modify the repository.
