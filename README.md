# Ustyle

uStyle, aptly named, is the styleguide gem for uSwitch. Include it in your Rails/Sinatra/Anything project as a gem and forget about those annoying additional cloudfront includes.

This is still in *alpha* stages and requires a massive cleanup. However it's already working as a base.

## Why?

Because Google hates more than one request to a stylesheet, and because this way you can pick and choose what you want without referencing more URLs. It's more manageable and means that all you need to do is "bundle update ustyle" to get the latest styleguide. 

## Requirements

- SASS

## Installation

Add this line to your application's Gemfile:

    gem 'ustyle', :git => "git@github.com:uswitch/ustyle.git"

And then execute:

    $ bundle

## To do

- Add uStyle generators for non-Rails websites.
- Clean up stylesheets
- Modularise (more)
- Added helpful variables to pass through to your app
- Test on Sinatra apps

## Usage

If using rails and SASS, just import the base uSwitch styles at the start of your file

    @import "ustyle"

That's it! You'll have the equivalent of this:

    uswitch-styleguide/vX.X.X/stylesheets/uswitch-style.css

In your styles.

All further styles (such as articles, ie styles etc are within ustyle/ folder). So if you wanted to import the Styleguide articles styling, all you would need to do is:

    @import "ustyle/articles"

If you want to be awesome with your IE styles and bin those conditionals, you can do something like this:

    .ie8
      @import "ustyle/ie"

Alternatively, have that inside a conditional IE stylesheet if you're using top level CSS classes for feature detection (such as .js or .no-js)

## Useful variables

By default, PIE is enabled on IE styles. In your variables file (I hope you have one...), just declare this:

    $has-pie: false

And then the IE styles won't load the PIE behaviour!

All the variables that you can override (SASS !default allows you to override within your own styles) are located here:

    app/assets/stylesheets/ustyle/basic/variables

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
