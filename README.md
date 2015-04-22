The summerofhacks.io website
===================

Summer of Hacks is an event series organised and run by [JSOxford](http://jsoxford.com).

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jsoxford/jsoxford.github.io?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/jsoxford/summerofhacks.github.io.svg?branch=develop)](https://travis-ci.org/jsoxford/summerofhacks.github.io)


This is a jekyll/github pages site.  You can run it locally with these commands

```bash
npm install && npm start
```

You can also build and optimise the site separately:
```bash
npm install # install npm, bower and gem dependencies
./node_modules/.bin/grunt build # build the site into _site
./node_modules/.bin/grunt optimize # make it wicked-fast
```

If you're feeling really adventurous, you can deploy it like so:

```bash
npm install && ./node_modules/.bin/grunt deploy
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

### Requirements

To build this site you'll need Ruby and Bundler installed (`gem install bundler`) as well as a newish version of NPM.

