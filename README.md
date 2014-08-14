# Ustyle - [Link](http://ustyle.uswitchinternal.com)

uStyle, aptly named, is the styleguide gem for uSwitch. Include it in your Rails/Sinatra/Anything project as a gem and forget about those annoying additional cloudfront includes.

## Requirements

- SASS
- Compass (for now)
- Coffee script (for javascript)
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

Then in your app file (usually named server.rb/app.rb etc), after declaring your `class App < Sintra::Base`:
``` ruby
register Sintra::Ustyle
```

**You must use `sprockets-sass` version 1.1.0 or above, as there was a bug where the postprocessor was getting added to the preprocessor which caused autoprefixer to break**

This is only for the gem, not the styleguide within this project.

## Installation

Add this line to your application's Gemfile:

    gem 'ustyle', :git => "git@github.com:uswitch/ustyle.git"

And then execute:

    $ bundle

To run on PHP projects or non-Ruby ones, you're going to have to set up a watch file to precompile the SASS. Guard-sass is a good option for this.

## Usage

If using rails and SASS, just import the base uSwitch styles at the start of your file

    @import "ustyle"

This will import *everything*, so if you want to just grab certain things like the grid (still a WIP) then just do this:

    @import "ustyle/grid"

## Contributing

See CONTRIBUTING.md
