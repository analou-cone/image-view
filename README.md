# Random Picture Viewer

The goal is that we can point our React App at a directory with graphic images
in it, and we will show them one at a time in random order.

These are the external dependencies we have pulled in.

 * Mirror.js - to make simple React+Redux. https://github.com/mirrorjs/mirror -
   more docs at https://github.com/mirrorjs/mirror/blob/master/docs/api.md
 * Skeleton CSS - to make UI and layout simple. http://getskeleton.com/

The directory you point at must have access control allow origin headers set
and must return an HTML document with images referenced with `href="..."`
tags.

The normal Apache generated indexes follow these requirements as long as you
put the access control allow origin headers in the directory with .htaccess
file.

## Project Goals

To learn React.js, Redux, Javascript, and programming. This is a very beginning
React framework too.

## Operational Guide

Prerequisite: install yarn, like so:

```
brew install yarn
```

### yarn start
Starts the development server.

### yarn build
Bundles the app into static files for production.

### yarn test
Starts the test runner.

### yarn eject
Removes this tool and copies build dependencies, configuration files
and scripts into the app directory. If you do this, you can’t go back!

## Authors

Analou Ellis - https://github.com/analou-cone - https://keybase.io/analoucone

I want to thank the people in my life who helped me get this far with computers.
Abelardo Apa, Tim Ellis, Nick White. Without them, I could not have made it this
far!

