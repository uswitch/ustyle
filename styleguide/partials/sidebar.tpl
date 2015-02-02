<div class='sidebar'>
  <h1><a class='logo' href='/docs' id='logo'>{{project.name}} styleguide</a></h1>
  <p class="version">v.<strong>{{project.version}}</strong></p>
  <div class='nav__wrapper'>
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