# Ustyle

uStyle, aptly named, is the styleguide gem for uSwitch. Include it in your Rails/Sinatra/Anything project as a gem and forget about those annoying additional cloudfront includes.

This is still in *alpha* stages and requires a massive cleanup. However it's already working as a base.

## Installation

### Requirements

- SASS

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

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
