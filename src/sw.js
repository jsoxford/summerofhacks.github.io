import * as _ from './bower/sw-toolbox/sw-toolbox.js';

console.log("font-sw")

toolbox.router.get('/(.*)', toolbox.cacheFirst, {
    origin: /fonts\.(gstatic|googleapis)\.com/,
    cache: {
      name: 'fonts-v1',
      maxEntries: 10
    }
  }
)
