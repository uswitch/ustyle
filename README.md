# Ustyle

uStyle, aptly named, is the styleguide gem for uSwitch. Include it in your Rails/Sinatra/Anything project as a gem and forget about those annoying additional cloudfront includes.

*The gem has been completely rewritten from the ground up with the new uSwitch styles, please look at the old branch if you want the old one*

## Why?

Google hates more than one request to a stylesheet, and because this way you can pick and choose what you want without referencing more URLs. It's more manageable and means that all you need to do is "bundle update ustyle" to get the latest styleguide.

## Requirements

- SASS

This is only for the gem, not the styleguide within this project.

## Installation

Add this line to your application's Gemfile:

    gem 'ustyle', :git => "git@github.com:uswitch/ustyle.git"

And then execute:

    $ bundle

To run on PHP projects or non-Ruby ones, you're going to have to set up a watch file to precompile the SASS. Guard-sass is a good option for this.

## To do

- Modularise (more)
- Finish off new styles

## Usage

If using rails and SASS, just import the base uSwitch styles at the start of your file

    @import "ustyle"

This will import *everything*, so if you want to just grab certain things like the grid (still a WIP) then just do this:

    @import "ustyle/grid"


## Variables

### Default grid settings

These are the default settings for the uSwitch grid

    $col-width: 70px !default
    $gutter-width: 30px !default
    $grid-columns: 12 !default
    $grid-columns-desktop: 10 !default
    $grid-columns-tablet: 8 !default

### Default responsive devices

    $large-desktop-width: em(1200px) !default
    $desktop-width:       em(992px) !default
    $tablet-width:        em(768px) !default
    $small-tablet-width:  em(601px) !default
    $mobile-width:        em(480px) !default

By default they are in EMs, you can change them to PX in your own variables file.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
