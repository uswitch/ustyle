<a href="javascript:void(0)" class="nav-mobile us-desktop--hidden js-toggle__link" data-target="sidebar"><span class="nav-mobile__hamburger">Open menu</span></a>
<div class='sidebar'>
  <a class='logo us-icon--large us-icon--uswitch us-icon--notext us-icon--custom us-icon--hover-typecyan' href='/docs' id='logo'>{{project.name}} styleguide</a>
  <p class="version us-tablet--block">v{{project.version}}</p>
  <div class='nav'>
    <nav class='nav__container'>
      <div class='nav__set-container'>
        <ul class='nav__set'>
          {{#pages}}
            <li class="nav__item">
              <a class="nav__link nav__main-link {{isActive this.name}}" href="{{page}}">{{name}}</a>
            </li>
          {{/pages}}
          <li class="nav__item">
            <a class="nav__link nav__main-link" href="sass/">Sass doc</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</div>
