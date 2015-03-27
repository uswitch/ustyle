<!DOCTYPE html>
<html class="no-js svg">
<head>
  {{> _head}}
</head>
<body>
  <div id="wrapper">
    <a href="javascript:void(0)" class="nav-mobile us-desktop--hidden js-toggle__link" data-target="sidebar"><span class="nav-mobile__hamburger">Open menu</span></a>
    <div class='sidebar'>
      <a class='logo us-icon--large us-icon--medium--sm-tablet us-icon--uswitch us-icon--notext us-icon--custom us-icon--hover-typecyan' href='/docs' id='logo'>{{project.name}} styleguide</a>
      <p class="version us-tablet--block">v{{project.version}}</p>
      <div class='nav'>
        <nav class='nav__container'>
          <div class='nav__set-container'>
            <ul class='nav__set'>
              <li class="nav__item">
                <a class="nav__link nav__main-link active" href="/">Stats</a>
              </li>
              <li class="nav__item">
                <a class="nav__link nav__main-link" href="/docs">Style guide</a>
              </li>
              <li class="nav__item">
                <a class="nav__link nav__main-link" href="/docs/sass">Sass doc</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <div class="us-hero trailered">
      <div class="container sidebar--push styleguide__header">
        <h1 class="styleguide__title">{{page.name}}</h1>
      </div>
    </div>
    <div class="styleguide container sidebar--push">
      {{#each page.content.report}}

        {{#isString this}}
          <div class="stat__entry us-col-md-4 stat--string">
            <div class="stat__value">{{this}}</div>
            <div class="stat__title">{{@key}}</div>
          </div>
        {{/isString}}

        {{#isNumber this @key}}
        <div class="stat__entry us-col-md-4 stat--number">
          <div class="stat__value">{{this}}</div>
          <div class="stat__title">{{@key}}</div>
        </div>
        {{/isNumber}}

        {{#isArray this}}
        <div class="stat__list us-col-md-4 stat--array">
          <div class="stat__value">{{this}}</div>
          <div class="stat__title">{{@key}}</div>
        </div>
        {{/isArray}}

      {{/each}}
    </div>
  </div>
  {{> _footer}}
</body>
</html>
