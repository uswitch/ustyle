var codeBlocks = document.querySelectorAll('pre code');

for (var i = codeBlocks.length - 1; i >= 0; i--) {
  var codeBlock = codeBlocks[i],
      lines, offset;

  lines = codeBlock.textContent.split( '\n' );

  if ( lines.length > 1 && lines[ lines.length - 1 ].trim() === '' ){
    lines.pop();
  }

  // how much white-space do we need to remove form each line?
  offset = lines[ 1 ].match( /^\s*/ )[ 0 ].length;

  // remove the excess white-space from the beginning of each line
  lines = lines.map( function ( line ) {
      return line.slice( offset );
  });

  lines.shift();

  codeBlock.textContent = lines.join( '\n' );

  hljs.highlightBlock(codeBlock);
};

toggleLinks = document.querySelectorAll(".js-toggle__link");

for (var i = toggleLinks.length - 1; i >= 0; i--) {
  var toggleLink = toggleLinks[i];
  toggleLink.addEventListener("click", clickToggle, false);
};

function clickToggle(event){
  var toggleLink = this;
  var target = document.querySelector("." + toggleLink.getAttribute("data-target"));
  var targetActiveClass = getActiveClass(target);
  var activeClass = getActiveClass(toggleLink);
  toggleLink.classList.toggle(activeClass);
  target.classList.toggle(targetActiveClass);
}

function getActiveClass(selector){
  console.log(selector);
  return selector.classList[0] + "--active";
};