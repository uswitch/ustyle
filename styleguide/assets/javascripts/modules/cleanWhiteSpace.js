function cleanWhiteSpace(codeBlocks){
    if (!codeBlocks) return;

    for (var i = codeBlocks.length - 1; i >= 0; i--) {
      var codeBlock = codeBlocks[i],
          lines, offset;

      var text = codeBlock.textContent || codeBlock.innerText;

      lines = text.split( '\n' );

      if ( lines.length > 1 && lines[ lines.length - 1 ].trim() === '' ){
        lines.pop();
      }

      var canClean = lines[1] != undefined;

      if (canClean) {
          // how much white-space do we need to remove form each line?
        offset = lines[ 1 ].match( /^\s*/ )[ 0 ].length;

        // remove the excess white-space from the beginning of each line
        lines = lines.map( function ( line ) {
            return line.slice( offset );
        });

        lines.shift();

        codeBlock.textContent = lines.join( '\n' );  
      }

      hljs.highlightBlock(codeBlock);
    };
  }
