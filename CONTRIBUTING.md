# Contributing

### Code style
Please see [uStyle](http://ustyle.uswitchinternal.com)

## Modifying the code

You have several options with regards to modifying, each of which come with their advantages and disadvantages.

### Method 1

1. Clone the existing repo.
1. Run `bundle install` to install all dependencies.
1. Create a new feature branch - do not work off `master`
1. Add in the features/fixes
1. Test -- this means running the gem locally on several projects. **Not just your own**
1. Commit with a *reasonable* commit message.
1. Submit a pull request and wait for it to be merged into master


### Method 2

**Warning: If you are unsure about using the publisher function, please use method 1. If you think you're super awesome and won't screw up uStyle versions, please read on.**

1. Clone existing repo
1. Run a `bundle config --local ustyle /PATH-TO-USTYLE` -- this will allow you to test and work off master on your local copy.
1. Work off `master` and add in your awesome features.
1. Test some more, ensure you've run this in a few projects.
1. Commit your feature, but do not edit `lib/ustyle/version.rb`
1. Following [Semver](http://semver.org/), update the `version.rb` file as necessary.
1. Run `bundle exec rake publish`
1. Voilà! You now have successfully updated and pushed the gem version, updated the stylesheets and built the styleguide. You're now a pro.
