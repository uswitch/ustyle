# [ustyle](http://ustyle.guide)

![ustyle unicorn](https://assets0.uswitch.com/s3/uswitch-assets-eu/ustyle/ustyle-unicorn.png)

uStyle, aptly named, is the styleguide gem for [uSwitch](http://www.uswitch.com). Include it in your Rails/Sinatra/Anything project as a gem to apply consistent styles according the uSwitch styleguide.

This project is provided as is and is aimed at building uSwitch specific projects.

* [Features](#features)
* [Infrastructure](#infrastructure)
* [Installation](#installation)
  * [Sinatra](#sinatra)
* [Usage](#usage)
  * [Rails / Sprockets apps](#rails--sprockets-apps)
  * [Node apps](#node-apps)
  * [Mixins/Varibales](#mixins--variables)
* [Development](#development)
* [Contributing](#contributing)

## Features

uStyle is a fully fledged living styleguide that delivers both CSS and JavaScript components for technical implementations as well as documentation for how these things should be applied across uSwitch.

* [Pattern library](https://ustyle.guide/pattern-library/index.html)
* [Design guidelines](https://ustyle.guide/design/index.html)
* [Brand guidelines](https://ustyle.guide/brand/index.html)

## Infrastructure

uStyle is compiled and uploaded to S3. Consequently it is served from Cloudfront via our nginx load balancers.

uStyle within applications is usually served within their asset pipeline on compilation.

## Installation

Pre-requisites:

If you want to use as a gem

* Ruby (1.9+)
* Sinatra / Rails applications with sprockets

This can also be used as a node package just like you would install any other package.

uStyle automagically sets itself up in a sprockets context where found. That means both Sinatra and Rails apps get configured correctly. However there are a few gotchas, as we don't want to add gem dependencies that are only required for certain set ups.

Add this line to your application's Gemfile:

```ruby
gem 'ustyle'
```

And then run in your terminal:

    $ bundle


### Sinatra


Add to your Gemfile:
``` ruby
gem 'sprockets'
gem 'sprockets-sass', '~> 1.2.0'
gem 'sprockets-helpers'
```

Then in your app file (usually named server.rb/app.rb etc), after declaring your `class App < Sinatra::Base`:

```ruby
register Sinatra::Ustyle
```

**You must use `sprockets-sass` version 1.1.0 or above, as there was a bug where the postprocessor was getting added to the preprocessor which caused autoprefixer to break**

This is only for the gem, not the styleguide within this project.

### Icons

uStyle serves it's icons via `<use xlink:href></use>` tags within an SVG. We have decided to not embed our SVGs, but rather serve them from a URL. See here for a better explanation: https://css-tricks.com/svg-use-with-external-reference-take-2/

Due to this, you need to have the `icons.svg` symbol map on the same domain, protocol and port as your application. To facilite this without serving a sprockets asset, ustyle comes with some `Rack Middleware`

For rails apps, in your `development.rb` file (you do not want this in production)
```ruby
config.middleware.use Ustyle::IconMiddleware
```

For rack apps (including Sinatra)
```ruby
configure :development do
  use Ustyle::IconMiddleware
end
```

Currently there is no middleware to support node apps, but can be written easily.

Alternatively, you can serve your application in a docker container with nginx (or another supporting proxy server) that has a route to /icons.svg so you can proxy pass to our icons for the app. Ports, domains and protocols **must** match when testing the icons.

An example nginx configuration:
```nginx
location = /icons.svg {
  set $upstream "https://assets0.uswitch.com/s3/uswitch-assets-eu/ustyle";
  proxy_pass $upstream$request_uri;
}
```

You can then successfully reference your icon like so:

```html
<svg role="img" class="us-icon--medium us-icon--custom us-icon--{$NAME}">
  <use xlink:href="/images/icons.svg#icon-{$NAME}"></use>
</svg>
```

## Usage

### Rails / Sprockets apps

If using Rails and Sass, just import the base uSwitch styles at the start of your file

```scss
@import "ustyle";
```

This will import the main components. If you want more granular control of what to import, please look at the source code or the styleguide.

### Node apps

uStyle comes with JavaScript implementations of the custom Sass Ruby functions used by Sprockets. To use uStyle's mixins and variables within your own Sass, you'll need to add these functions to the compiler you're using. For example, using [node-sass](https://github.com/sass/node-sass) in a project that also has [Webpack](https://webpack.js.org/), you can do the following:

```javascript
// In your webpack.config.js

import { SassHelpers } from 'ustyle';

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /.scss$/,
        use: [{
          loader: 'sass-loader',
          options: {
            functions: SassHelpers
          }
        }]
      }
      // ...
    ]
  }
  // ...
};
```

### Mixins / Variables

Ustyle comes bundled with a good set of Sass variables and mixins to use in your project.

For Sass documentation on mixins/variables available to you, please see: https://ustyle.guide/sass/

## Development

Development is done using [Grunt](http://gruntjs.com/), but it's just a thin wrapper around the heavy lifting done by some Node modules.

To install development

    $ npm install -g grunt-cli
    $ npm install
    $ bundle

To run in development, just run

    grunt

This will open a http://localhost:3000 tab with the styleguide

## Contributing

See [CONTRIBUTING.md](https://github.com/uswitch/ustyle/blob/master/CONTRIBUTING.md)

## Licences

- Source code is licenced under the Apache v2.0 licence
- All icons, except the uSwitch icon are licenced under [CC - Attribution - No Derivatives 4.0](http://creativecommons.org/licenses/by-nd/4.0/)
- uSwitch icon is licenced under [CC - Attribution - NonCommercial - NoDerivates 4.0](http://creativecommons.org/licenses/by-nc-nd/4.0/)
