# Contributing

### Code style
Please see [uStyle](http://ustyle.guide)

## Modifying the code

You have several options with regards to modifying, each of which come with their advantages and disadvantages.

### Documentation

Documentation must be written for any component you are actively working on. All documentation that isn't full page examples remains within the source code `.scss` files. We use [DSS](https://github.com/darcyclarke/DSS) for documenting components. This is done like this:

```scss
// @page Forms
// @name Inputs
// 
// @description
//   The standard form input, `.us-form-input`, styled with our brand colours. Explicitly
//   classed to allow individual app styling for other inputs
//
// @state .large - Larger input style
//
// @markup
//   <input class='us-form-input {$modifiers}' type='text'>
```

`{$modifiers}` is a placeholder where the different states get rendered. If the component you are documenting requires an additional, more complex, component that doesn't quite fit the basic `style_block.tpl` layout, you can declare a partial, like so:

```scss
@page Colours
@name Base colours
@partial colours
```

Then you can have a partial named `colours.tpl` in `partials/` and run with that.

All output of our documentation goes to `ustyle.json` in `build/`. This contains the JSON which is then parsed by our `builder.js` module and compiled to handlebars. All context within DSS is available on the templates.

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
2. Ensure you commit `/dist` into your changes
1. Run `grunt publish:version:{patch,minor,major}`
1. Voilà! You now have successfully updated and pushed the gem version, updated the stylesheets and built the styleguide. You're now a pro.

Publishing
===

Versioning gets done automatically by the `grunt:publish` command. However without specifying a type of version, if will just publish `HEAD` without a new release. 

    $ grunt publish:version:{patch,minor,major}
