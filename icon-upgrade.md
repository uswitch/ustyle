Upgrading the icon font to the SVG icons
===

This will take some time, and you no longer have the ability to extend icons within your own stylesheets, so you need to rely on class names to build your icon styles. 

Removal of old icons
---

In your project, remove all declarations of the following:
```scss
@extend %icon-font
@include icon-font
font-family: 'uswitch-icon' sans-serif
```

The next step will be to find any custom icon declarations within your Sass files. This is usually when you are editing :pseudo elements. Look for this in your project:
```scss
content: '\
```

There will be no additional CSS you need to write for the new icons, it is all markup. Positioning is up to you. 

There are 3 sizes
---

| Class name | Size (px) |
|------------|-----------|
|.us-icon--small|16px    |
|.us-icon--small|32px    |
|.us-icon--small|64px    |

There are 5 colours
---

| Class name | Colour    |
|------------|-----------|
|.us-icon--white|    #fff|
|.us-icon--typegrey|    #333|
|.us-icon--inputgrey|    #97999a|
|.us-icon--typecyan|    #008fe9|
|.us-icon--custom|    **variable** (falls back to #1c1f4e)|

`.us-icon--custom` will return a different colour for specific icons. For example, brand icons (like twitter, facebook, uswitch) will return their brand colours. Icons such as `.us-icon--renewable` and `.us-icon--tick` will return green, and `.us-icon--cross` will return red.

Mark-up of an icon
---

You create an icon by chaining several classes together to get the desired effect.

For `:pseudo` elements (:before, :after), add the class names onto the parent. Like this:

```html
<span class='us-btn save__button save__button--saved us-btn--blocked us-btn--action us-icon--before us-icon--tick-circle--before us-icon--small--before'>
    Results saved
</span>
```

Will return:

![Results save](http://snag.gy/t6l0L.jpg)

The class names used to build this icon are the following. Note that we don't declare the `.us-icon--white--before` because it's the default colour. If you want to change the colour, you will need to do that. E.g `.us-icon--typecyan--before`.

```scss
.us-icon--before (can be --after)
.us-icon--tick-circle--before
.us-icon--small--before
```

The same icon can be constructed with an additional `div`. Just remove the `--before` from all the classnames. Here is an example:

```html
<span class='us-btn save__button save__button--saved us-btn--blocked us-btn--action'>
    <span class='us-icon--tick-circle us-icon--small us-icon--notext'></span>
    Results saved
</span>
```

Here, `.us-icon--notext` is used to make the icon display `inline-block`. Here is the `.us-icon--notext` CSS:

```scss
.us-icon--notext {
  display: inline-block;
  text-indent: -999em;
}
```

Hover states
---

To have the icon change colour on hover, append the class: `.us-icon--hover-{COLOR}` or `.us-icon--hover-{COLOR}--before/after`. This will only target the icon element. We are working on giving you more flexibility here.

Responsive icon sizes
---

To change the icon sizes for mobile / small-tablet, you have

```scss
.us-icon--{SIZE}--mobile
.us-icon--{SIZE}--after--mobile
.us-icon--{SIZE}--before--mobile

.us-icon--{SIZE}--sm-tablet
.us-icon--{SIZE}--after--sm-tablet
.us-icon--{SIZE}--before--sm-tablet
```

Note that we only support changing icon sizes on smaller screens (max-width media queries).


Adding new icons
---
1. add a new icon under *vendor/assets/images/icons*
1.1 make sure the new icon is using svg tiny and it's not responsive
1.2 make sure the view port, width and height are as the following: *width="32" height="288" viewBox="0 0 32 288"*
2. add your icon to variables/_icons.scss
3. add your icon to icons/_state.scss
4. run grunt icons 
5. update includes 


Icon list
---

| Old icon name   |      New icon name     |
|----------|------------- |
| .uicon-alarm | .us-icon--alarm |
| .uicon-android | .us-icon--android |
| .uicon-angry | .us-icon--angry |
| .uicon-apple | .us-icon--apple |
| *new* | .us-icon--arrow-circle |
| .uicon-arrow-up-left | .us-icon--arrow-up-left |
| .uicon-arrow-up | .us-icon--arrow-up |
| .uicon-barchart | .us-icon--barchart |
| .uicon-blackberry | .us-icon--blackberry |
| .uicon-book | .us-icon--book |
| .uicon-bookmark | .us-icon--bookmark |
| .uicon-breadcrumb | .us-icon--breadcrumb |
| .uicon-calculator | .us-icon--calculator |
| .uicon-calendar | .us-icon--calendar |
| .uicon-car | .us-icon--car |
| *was tick, now should be used only for checkboxes* | .us-icon--checkbox-tick |
| .uicon-clock | .us-icon--clock |
| .uicon-cancel-circle | .us-icon--close |
| .uicon-cog | .us-icon--cog |
| .uicon-creditcard | .us-icon--credit-card |
| .uicon-cross | .us-icon--cross |
| .uicon-screen-desktop | .us-icon--desktop |
| .uicon-file-word | .us-icon--doc |
| .uicon-arrow-down | .us-icon--down-arrow |
| .uicon-dual-fuel | .us-icon--dual-fuel |
| .uicon-electric-light | .us-icon--electric-light |
| .uicon-envelop | .us-icon--envelope |
| *new* | .us-icon--exit-noexit |
| .uicon-facebook-2 | .us-icon--facebook |
| *new* | .us-icon--filter |
| *new* | .us-icon--fixed-variable |
| .uicon-gas | .us-icon--gas |
| .uicon-gauge | .us-icon--gauge |
| *new* | .us-icon--github |
| .uicon-google-plus | .us-icon--google |
| .uicon-graph-up | .us-icon--graph-up |
| .uicon-happy | .us-icon--happy |
| .uicon-home | .us-icon--home |
| .uicon-hot | .us-icon--hot |
| .uicon-info | .us-icon--info |
| .uicon-kettle | .us-icon--kettle |
| .uicon-key | .us-icon--key |
| .uicon-screen-latop | .us-icon--laptop |
| .uicon-lock | .us-icon--lock |
| .uicon-lock-closed | **gone** |
| .uicon-lock-open | **gone** |
| .uicon-magnify-plus | .us-icon--magnify-in |
| .uicon-magnify-minus | .us-icon--magnify-out |
| .uicon-magnify-button | **gone** |
| .uicon-magnify-button-plus | **gone** |
| .uicon-magnify-button-minus | **gone** |
| .uicon-magnify | .us-icon--magnify |
| .uicon-hamburger | .us-icon--menu |
| *new* | .us-icon--message |
| .uicon-screen-mobile | .us-icon--mobile |
| *new* | .us-icon--monthly-dd |
| .uicon-neutral | .us-icon--neutral |
| .uicon-blocked | .us-icon--no-exit |
| .uicon-file-pdf | .us-icon--pdf |
| .uicon-pencil | .us-icon--pencil |
| *new* | .us-icon--person-add |
| .uicon-person | .us-icon--person |
| .uicon-phone | .us-icon--phone |
| .uicon-piggy-bank | .us-icon--piggy-bank |
| .uicon-pin | .us-icon--pin |
| .uicon-pound-note | .us-icon--pound-note |
| .uicon-pound-notes | **gone** |
| .uicon-pound-coins | **gone** |
| .uicon-pound-coin | **gone** |
| .uicon-pound-bag | **gone** |
| .uicon-on-off | .us-icon--power |
| .uicon-present | .us-icon--present |
| .uicon-print | .us-icon--print |
| *new* | .us-icon--quarterly-dd |
| .uicon-help-centre | .us-icon--question-circle |
| .uicon-help-inner | .us-icon--question |
| *new* | .us-icon--quote |
| .uicon-recycle | .us-icon--recycle |
| .uicon-remove | .us-icon--remove |
| .uicon-green | .us-icon--renewable |
| *new* | .us-icon--results |
| .uicon-sad | .us-icon--sad |
| .uicon-disk | .us-icon--save |
| *new* | .us-icon--share |
| .uicon-sim | .us-icon--sim |
| .uicon-smiley | .us-icon--smiley |
| *new* | .us-icon--sort |
| .uicon-bubble-disc | .us-icon--speech-circle |
| .uicon-bubble | .us-icon--speech |
| .uicon-spinner | .us-icon--spinner |
| *new* | .us-icon--star-half |
| .uicon-star2 | .us-icon--star |
| *new* | .us-icon--starline-half |
| .uicon-star | .us-icon--starline |
| .uicon-screen-tablet | .us-icon--tablet |
| .uicon-bubbles | .us-icon--talk |
| .uicon-checkmark-circle | .us-icon--tick-circle |
| .uicon-tick | .us-icon--tick |
| .uicon-screen-tv | .us-icon--tv |
| .uicon-twitter | .us-icon--twitter |
| .uicon-uswitch | .us-icon--uswitch |
| *new* | .us-icon--variable |
| .uicon-warn-new | .us-icon--warning-circle |
| .uicon-warn-inner | .us-icon--warning |
| .uicon-wifi | .us-icon--wifi |
| *new* | .us-icon--wiki |
| .uicon-windows8 | .us-icon--windows |
| .uicon-wondering | .us-icon--wondering |
| .uicon-earth | .us-icon--world |
| .uicon-file-excel | .us-icon--xml |
| .uicon-support | **gone** |
| .uicon-expand | **gone** |
| .uicon-location | **gone** |
| .uicon-contract | **gone** |
| .uicon-facebook | **gone** |
| .uicon-feed2 | **gone** |
| .uicon-feed | **gone** |
| .uicon-skype | **gone** |
| .uicon-file-zip | **gone** |
| .uicon-folder | **gone** |
| .uicon-clock2 | **gone** |
| .uicon-ampersand | **gone** |
| .uicon-target | **gone** |
| .uicon-globe | **gone** |
| .uicon-stats | **gone** |
| .uicon-arrow-up-right | **gone** |
| .uicon-arrow-right | **gone** |
| .uicon-arrow-down-right | **gone** |
| .uicon-arrow-down | **gone** |
| .uicon-arrow-down-left | **gone** |
| .uicon-arrow-left | **gone** |
| .uicon-first | **gone** |
| .uicon-left | **gone** |
| .uicon-right | **gone** |
| .uicon-last | **gone** |
| .uicon-up | **gone** |
| .uicon-cloud | **gone** |
| .uicon-heart | **gone** |
| .uicon-heart-broken | **gone** |
| .uicon-stop | **gone** |
| .uicon-warn-right | **gone** |
| .uicon-warn-left | **gone** |
| .uicon-warn-centre | **gone** |
| .uicon-warn-big | **gone** |
| .uicon-attachment | **gone** |
| .uicon-safe | **gone** |
| .uicon-ruler | **gone** |
| .uicon-reverse | **gone** |
| .uicon-nav-jump-right | **gone** |
| .uicon-nav-jump-left | **gone** |
| .uicon-barcode | **gone** |
| .uicon-help-right | **gone** |
| .uicon-help-left | **gone** |
| .uicon-help-blank | **gone** |
| .uicon-help-big | **gone** |
| .uicon-graph-right | **gone** |
| .uicon-electric | **gone** |
| .uicon-discount-pound | **gone** |
| .uicon-code | **gone** |
| .uicon-clity | **gone** |
| .uicon-box-open | **gone** |
| .uicon-box-closed | **gone** |
| .uicon-list | **gone** |
| .uicon-big | **gone** |
| .uicon-small | **gone** |
| .uicon-backspace | **gone** |
| .uicon-airplane | **gone** |
| .uicon-twitter-2 | **gone** |
| .uicon-headphone-mic | **gone** |
| .uicon-sun | **gone** |
| .uicon-tap | **gone** |
| .uicon-truck | **gone** |
| .uicon-scissors | **gone** |
| .uicon-shuffle | **gone** |
| .uicon-address-book | **gone** |
| .uicon-popup | **gone** |
| .uicon-umbrella | **gone** |
| .uicon-cloud-download | **gone** |
| .uicon-cloud-upload | **gone** |
| .uicon-postit | **gone** |
| .uicon-warn-inner | **gone** |
