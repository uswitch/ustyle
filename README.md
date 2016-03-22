# [ustyle](http://ustyle.guide)
![ustyle unicorn](https://assets0.uswitch.com/s3/uswitch-assets-eu/ustyle/ustyle-unicorn.png)

uStyle, aptly named, is the styleguide gem for [uSwitch](https://www.uswitch.com). Include it in your Rails/Sinatra/Anything project as a gem and forget about those annoying additional cloudfront includes.

This project is provided as is and is aimed at building uSwitch specific projects.

## Gem Requirements

- Sprockets
- SASS
- Autoprefixer

## Sprockets

uStyle automagically sets itself up in a sprockets context where found. That means both Sinatra and Rails apps get configured correctly. However there are a few gotchas, as we don't want to add gem dependencies that are only required for certain set ups.

### Sinatra applications

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

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'ustyle', git: "git@github.com:uswitch/ustyle.git"
```

And then run in your terminal:

    $ bundle

Version locking - if you're unsure about when you're going to have the change to upgrade again.

```ruby
gem 'ustyle', git: "git@github.com:uswitch/ustyle.git", tag: "VERSION"
```

## Usage

If using rails and SASS, just import the base uSwitch styles at the start of your file

```scss
@import "ustyle";
```

This will import the main components. If you want more granular control of what to import, please look at the source code or the styleguide.

## Development

Development is done using [Grunt](http://gruntjs.com/), but it's just a thin wrapper around the heavy lifting done by some Node.js modules.

To install development

    $ npm install -g grunt-cli
    $ npm install
    $ bundle

To run in development, just run

    grunt

This will open a http://localhost:3000 tab with the styleguide

## Documentation

See [JAVASCRIPT_STANDARDS.md](https://github.com/uswitch/ustyle/blob/master/JAVASCRIPT_STANDARDS.md)

## Contributing

See [CONTRIBUTING.md](https://github.com/uswitch/ustyle/blob/master/CONTRIBUTING.md)

## Licences

- Source code is licenced under Apache v2.0 licence
- All icons, except the uSwitch icon are licenced under [CC - Attribution - No Derivatives 4.0](http://creativecommons.org/licenses/by-nd/4.0/)
- uSwitch icon is licenced under [CC - Attribution - NonCommercial - NoDerivates 4.0](http://creativecommons.org/licenses/by-nc-nd/4.0/)
