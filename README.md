# ustyle - [link](http://ustyle.uswitchinternal.com)

uStyle, aptly named, is the styleguide gem for uSwitch. Include it in your Rails/Sinatra/Anything project as a gem and forget about those annoying additional cloudfront includes.

## Requirements

- SASS
- Coffeescript
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
``` ruby
register Sinatra::Ustyle
```

**You must use `sprockets-sass` version 1.1.0 or above, as there was a bug where the postprocessor was getting added to the preprocessor which caused autoprefixer to break**

This is only for the gem, not the styleguide within this project.

## Installation

Add this line to your application's Gemfile:

    gem 'ustyle', git: "git@github.com:uswitch/ustyle.git"

And then execute:

    $ bundle

Verion locking - if you're unsure about when you're going to have the change to upgrade again. (not recommended)

    gem 'ustyle', git: "git@github.com:uswitch/ustyle.git", tag: VERSION

To run on PHP projects or non-Ruby ones, you're going to have to set up a watch file to precompile the SASS. Guard-sass is a good option for this.

## Usage

If using rails and SASS, just import the base uSwitch styles at the start of your file

    @import "ustyle"

This will import everything. If you want more granular control of what to import, please look at the source code or the styleguide. The file names are all there.

## Development

Development is done using [Grunt](http://gruntjs.com/), but it's just a thin wrapper around the heavy lifting done by some Node.js modules. 

To run in development, just run

    grunt

This will open a [BrowserSync](http://www.browsersync.io/) window with an overview of our stylesheet stats and a link to the styleguide. 

## Documentation

See CONTRIBUTING.md

## Contributing

See CONTRIBUTING.md
