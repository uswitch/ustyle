<div class='sidebar'>
  <a class='logo us-icon--large us-icon--uswitch us-icon--notext us-icon--custom us-icon--hover-typecyan' href='/docs' id='logo'>{{project.name}} styleguide</a>
  <p class="version us-tablet--block">v{{project.version}}</p>
  <div class='nav'>
    <nav class='nav__container'>
      <div class='nav__set-container'>
        <ul class='nav__set'>
          {{#pages}}
            <li class="nav__item">
              <a class="nav__link nav__main-link {{isActive this.name}}" href="/docs/{{page}}">{{name}}</a>
            </li>
          {{/pages}}
          <li class="nav__item">
            <a class="nav__link nav__main-link" href="/docs/sass">Sass doc</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</div>
