# IBM CICS on GitHub - website

This website is the homepage of Git repositories for IBM CICS, and is available at [https://cicsdev.github.io](https://cicsdev.github.io).

## Local Development

To develop this website, take the following steps:

1. Fork and clone it locally.

1. From the `_build` directory, run `npm install` to download dependencies. We assume you have a modern Node.js and NPM installed.

1. From the `_build` directory, run `npm run build` to perform the build. To run the build and keep watching changes, run `npm run build -- watch`.

1. To see the full rendered site as GitHub serves it (complete with variables resolved), you need to serve the result via Jekyll, the static site generator that GitHub uses. [Install Jekyll](https://jekyllrb.com/docs/installation/), then run `jekyll serve` from the root of the repository to serve the site.

The build of the site uses Gulp as a task runner, compiling Javascript and SASS, performing minification, and inserting front-matter to get Jekyll to resolve variables.
