module Ustyle
  module Icons
    def self.loader svg_css_path, png_css_path
      "
      <script>
      var svgCSSPath = '#{svg_css_path}',
          pngCSSPath = '#{png_css_path}'; 
      var isSVG=!!document.createElementNS&&!!document.createElementNS(\"http://www.w3.org/2000/svg\",\"svg\").createSVGRect&&!!document.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#Image\",\"1.1\")&&!(window.opera&&-1===navigator.userAgent.indexOf(\"Chrome\"))&&-1===navigator.userAgent.indexOf(\"Series40\");function loadCSSAsync(e){function f(){for(var b,c=0;c<d.length;c++)d[c].href&&-1<d[c].href.indexOf(e)&&(b=!0);b?a.media=\"all\":setTimeout(f)}var a=window.document.createElement(\"link\"),b=window.document.getElementsByTagName(\"script\")[0],d=window.document.styleSheets;a.rel=\"stylesheet\";a.href=e;a.media=\"only x\";a.onload=null;b.parentNode.insertBefore(a,b);f();return a}var img=new Image;img.onload=function(){isSVG?loadCSSAsync(svgCSSPath):loadCSSAsync(pngCSSPath)};img.src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==\";
      </script>
      "
    end
  end
end
