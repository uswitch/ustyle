<!DOCTYPE html>
<html>
<head>
  {{> _head}}
</head>
<body>
  <div id="wrapper">
    {{> sidebar}}
    <div class="us-hero trailered">
      <div class="container sidebar--push styleguide__header">
        <h1 class="styleguide__title">{{page.name}}</h1>
      </div>
    </div>
    <div class="styleguide container sidebar--push" style="background: blue;">
      <div class="us-content-group">
        <div class="us-grid-row">
          <div class="us-col-lg-9 us-col-xlg-10 us-col-xsm-7">
            
            <div class="us-featured us-container">
             <div class="us-featured__header us-grid-row padding-top padding-bottom">
               <div class="us-featured__header-title us-col-xsm-9 content-left">
                 Title goes here
               </div>
               <div class="us-featured__header-subtitle us-col-xsm-3 content-right">
                 Promotion
               </div>
             </div>
             <div class="us-featured__content us-grid-row padding-top padding-bottom">
               <div class="us-desktop--hidden us-col-xsm-3 us-mobile-block">
                 <img class="us-img--full" src="http://uswitch-wp-cms-assets.s3-website-eu-west-1.amazonaws.com//www.uswitch.com/money/guides/wp-content/uploads/2014/11/DB2011AU01018_SMALL.jpg" width="200">
               </div>
               <div class="us-col-xsm-6 us-col-lg-8">
                 <div class='us-usp us-usp--blue'>
                   Awesome deal usp
                 </div>
                 <ul>
                   <li>List item 1</li>
                   <li>List item 2</li>
                   <li>List item 3</li>
                 </ul>
                 <div class="us-col-xsm-6 us-desktop--block">
                   <div class="us-featured-highlight">
                     <strong class="us-featured-highlight__title">
                       £99.99
                     </strong>
                     monthly cost
                   </div>
                 </div>
                 <div class="us-col-xsm-6 us-desktop--block">
                   <div class="us-featured-highlight">
                     <strong class="us-featured-highlight__title">
                       £99.99
                     </strong>
                     monthly cost
                     <br>
                     <a class="us-featured-highlight__link us-link" href="#">Link</a>
                   </div>
                 </div>
               </div>
               <div class="us-col-xsm-3 us-col-lg-4">
                 <img class="us-img--full us-desktop--block" src="http://uswitch-wp-cms-assets.s3-website-eu-west-1.amazonaws.com//www.uswitch.com/money/guides/wp-content/uploads/2014/11/DB2011AU01018_SMALL.jpg" width="200">
                 <button class="margin-top margin-bottom us-btn us-btn--primary us-btn us-btn--blocked">See deal</button>
                 <div class="us-icon--before us-icon--small--before us-icon--typegrey--before us-icon--clock--before content-center">
                   <strong>3 days left</strong>
                 </div>
               </div>
             </div>
             <div class="us-featured__footer us-grid-row padding-top padding-bottom us-desktop--block">
               <div class="us-col-xsm-12">
                 Legal stuff goes here
               </div>
             </div>
            </div>

          </div>
        </div>
      </div>

  </div>
</div>
</div>
</div>
  {{> _footer}}
</body>
</html>
