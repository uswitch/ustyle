console.log(document.querySelectorAll( ".styleguide_intro h2" )[0]);

var sectionLinks = document.querySelectorAll( ".styleguide_intro h2" );
for (var i=0;i<sectionLinks.length;i++) {
  sectionLinks[i].addEventListener('click', function() {
    this.parentNode.parentNode.classList.toggle('styleguide_module_on');
  }, false);
}


