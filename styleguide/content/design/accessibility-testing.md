Everyone experiences disability at some point in their life, whether permanent
(blindness, deafness, motor impairment) or temporary (fatigue, migraines, a broken arm).
These things may make the things we build difficult to use.

Below, you'll find recommended tools and processes that will help make it easier
for folk to use the things we build without frustration.

The web is for everyone, and it is our job to make sure that everyone can access it.

## Recommended (Free) Tools

* [Pa11y Dashboard]
* [aXe Chrome Extension]
* [tota11y]
* [Lighthouse]
* [a11y]

## How to test

### Using automated tools

There are a lot of options, both free and paid for, to automatically test the
accessibility of our products. From the most basic like [tota11y] and [a11y]
, to
the more involved like Chrome’s Accessibility Audit tool and aXe. These tools can
provide a great overview of where we might be going wrong, and even suggest ways
to improve.

But with great power, comes great responsibility. We cannot rely on automated tool
to help us find and fix all the issues.
[GDS discovered](https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage)
that even a tool like Chrome's Accessibility auditor only surface 17% of accessibility issues.

Just because a tool says something is broken, we should still manually test to
prove it is. These automated tools provide solutions, but they are neither the
only or the most suitable solution for our users.

### Manual Testing

Nothing really beats manual testing. The more you do this, the easier you’ll find
it to spot potential accessibility errors.

#### Keyboard Only

* Can the page be navigated just by using a keyboard?
* Can you TAB to all interactive elements (links, buttons, form inputs) and interact
with such elements using traditional keys (ESC, Arrows)?
* When TABbing, do you lose track of where the keyboard is focused, suggesting that
there are hidden elements on the page you shouldn’t be able to navigate to?

#### Screen Readers

Use a screen reader like [NVDA](https://www.nvaccess.org/),
[JAWS](http://www.freedomscientific.com/Products/Blindness/Jaws), or
[VoiceOver](https://www.apple.com/accessibility/mac/vision/) to go through your
web page.

* Can you access and understand all of the content someone not using a screen reader can?
* Does the hierarchy of the content make sense?
* Can one easily navigate to different landmarks on the page
(e.g header, navigation, main content, supplementary content like an aside or footer)?

Note that you shouldn’t sink time into becoming an expert with a screen reader.
Unless you use a screen reader every day and have a legitimate need to do so, you
are unlikely to ever use a screen reader how they should be used.

It's important to note here that you cannot truly say your product is accessible
until you've tested them with folk who benefit from this work.

---

For more about how we can make uSwitch and the world more accessible, check out
our blog posts on [quick wins](https://labs.uswitch.com/four-accessibility-wins/)
and [how to perform an accessibility audit](https://labs.uswitch.com/how-to-do-an-accessibility-audit/).

Check out our tips on [usability testing](../design/validating-designs.html), too.

[Pa11y Dashboard]: https://github.com/pa11y/dashboard
[aXe Chrome Extension]: https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd)
[tota11y]: https://khan.github.io/tota11y/
[Lighthouse]: https://github.com/GoogleChrome/lighthouse
[a11y]: https://www.npmjs.com/package/a11y
