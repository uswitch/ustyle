# Ustyle - [Link](http://ustyle.uswitchinternal.com)

uStyle, aptly named, is the styleguide gem for uSwitch. Include it in your Rails/Sinatra/Anything project as a gem and forget about those annoying additional cloudfront includes.

## Why?

Google hates more than one request to a stylesheet, and because this way you can pick and choose what you want without referencing more URLs. It's more manageable and means that all you need to do is "bundle update ustyle" to get the latest styleguide.

## Requirements

- SASS
- Compass (for now)
- Coffee script (for javascripts)

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
