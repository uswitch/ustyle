---
name: Usability testing
---
<!-- Index -->

<ul class="table-of-contents">
  <li><a href="#no-validation">When don't we need validation?</a></li>
  <li><a href="#validation">When do we need validation?</a></li>
  <li><a href="#testing">How to validate assumptions by testing</a></li>
</ul>
  

<!-- Intro -->

  <p>Use this guide if you:</p>
  <ul>     
    <li>If you are unclear where testing fits into the product development cycle</li>
    <li>If you are unclear whether testing is needed not</li>
    <li>If you are unsure what kind of test to run</li>
    <li>If you face external pressures to design something that you feel maybe wrong and have no frame of reference for that</li>
    <li>If you need to benchmark a component, behaviour or interaction or reach consensus in the team</li>
  </ul>



<!-- When don’t we need validation of our designs? -->

<div class="us-content-group">
  <a id="#no-validation"></a>
  <h2>When don’t we need validation of our designs?</h2>
  <p>Plenty of design changes don’t require upfront hypothesis validation</p>
  <ul>
    <li><a href="#Site-consistency">Site consistency</a></li>
    <li><a href="#Design-conventions">Design conventions</a></li>
    <li><a href="#Usability-conventions">Usability conventions</a></li>
    <li><a href="#External-requirements">External requirements</a></li>
  </ul>

  <a id="Site-consistency"></a>
  <h2>Site consistency</h2>
  <p>Colour, font, shading, button types, and anything in uStyle is a given. We want to achieve site consistency for brand reasons.</p>
  <p>Functionality, UI, hierarchy are not 'look and feel' consistency.</p>
  <h4>Example</h4>
  <p>Moving the first two Broadband designs ('Oldest stlye' and 'Old style') to be more ‘in line’ with the third design ('New style') is an on-going project of consistency.</p>
  <p>Changing the colours of the first design or moving to a consistent layout would not require testing.</p>
  <p>Similarly, changing the row-data presentation in the second example to be more consistent with the third example would not require testing.</p>
  <div class="us-grid-row">
    <div class="us-col-md-6">
      <i>Oldest style</i><img alt="image" class="us-img--full trailered" src="/images/site-consistency01.png">
      <i>New style</i><img alt="image" class="us-img--full trailered" src="/images/site-consistency03.png">
    </div>
    <div class="us-col-md-6">
      <i>Old style</i><img alt="image" class="us-img--full trailered" src="/images/site-consistency02.png">
    </div>
  </div>

  <a id="Design-conventions"></a>
  <h2>Design conventions</h2>
  <p>There are certain web-design standards, and in our aim for a consistent user experience, maintaining web consistency is an important part of that.</p>
  <p>The following is a non-exhaustive list of design conventions:</p>
  <ul>
    <li>Logos top (left) and links to HP</li>
    <li>Navigation is top of the page</li>
    <li>Text links are blue (pre-click)</li>
    <li>Buttons link to stuff (affordance)</li>
    <li>Icons (search)</li>
    <li>Visual hierarchy</li>
    <li>Search (top right)</li>
    <li>Clickable form fields</li>
  </ul>
  <h4>Example</h4>
  <p>A basic UI convention is the distinction between active elements and inactive elements, with inactive elements being 'greyed out'.</p>
  <p>The below car insurance has an overlay that must be interacted with to continue with the page below, but only part of the page is greyed out.</p>
  <p>Five clickable elements on this page aren’t greyed out, despite not being clickable:</p>
  <div class="us-grid-row">
    <div class="us-col-md-6">
      <img alt="image" class="us-img--full trailered" src="/images/design-conventions.png">
    </div>
  </div>

  <a id="Usability-conventions"></a>
  <h2>Usability conventions</h2>
  <p>The <a href="https://www.nngroup.com/articles/ten-usability-heuristics/">ten basic usability heurisitcs</a>, like basic design rules, give us a number of usability principles that must be sense-checked against. Designs that do not meet these requirements give us a clear problem to be solved without the requirement of validation. </p>
  <ol>
    <li>
      <p><strong>Visibility of system status</strong> - Keep users informed about what is going on through appropriate feedback within reasonable time. In the example below the user cannot see what impact selecting a dropdown option has because the overlay covers the results table:</p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
         <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-visibility.png">
            <p>
             <i>"Did updating those filters do anything?"</i>
            </p>
        </div>
      </div>
    </li>
    <li><p><strong>Match between system and the real world</strong> - Speak the users' language with words, phrases and concepts familiar to the user, rather than system-oriented terms. Follow real-world conventions, making information appear in a natural and logical order.</p>
      <div class="us-grid-row">
        <div class="us-col-md-4">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-real-world.png">
            <p>
              <i>"Large as in size of people or house? Doesn’t it depend what they’re doing? What’s a Plusnet safeguard?"</i>
            </p>
        </div>
      </div>
    </li>
    <li><p><strong>User control and freedom</strong> – If a user makes a mistake, let them undo, redo, go back, etc...</p>
      <div class="us-grid-row">
        <div class="us-col-md-10">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-freedom.png">
            <p>
              <i>"I wanted more details...and now i've left the site....how do I get back?”</i>
            </p>
        </div>
      </div>
    </li>
    <li><p><strong>Consistency and standards</strong> - Users should not have to wonder whether different words, situations, or actions mean the same thing.</p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-consistency.png">
            <p>
              <i>"Is a plan and a tariff the same thing?”</i>
            </p>
        </div>
      </div>
    </li>
    <li><p><strong>Error prevention</strong> - Even better than good error messages is a careful design which prevents a problem from occurring in the first place.</p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-error.png">
            <p>
              <i>"No deals, why did you present it as an option?"</i>
            </p>
        </div>
      </div>
    </li>
    <li><p><strong>Recognition rather than recall</strong> - Minimise the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part to another.</p>
      <div class="us-grid-row">
        <div class="us-col-md-4">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-recognition.png">
            <p>
              <i>"I’ve filtered these results, but by what?"</i>
            </p>
        </div>
      </div>
    </li>
    <li><p><strong>Flexibility and efficiency of use</strong> - Allow users to tailor frequent actions. 1-button checkout via Amazon, or Add to my wishlist via Airbnb.</p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-flexibility.png">
            <p>
              <i>"I personalised all these details yesterday, why has it just reverted?"</i>
            </p>
        </div>
      </div>
    </li>
    <li><p><strong>Aesthetic and minimalist design</strong> - Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.</p>
      <div class="us-grid-row">
        <div class="us-col-md-6">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-minimalist.png">
            <p>
              <i>"What am I supposed to do on this page?"</i>
            </p>
        </div>
      </div>
    </li>
    <li><p><strong>Help users recognise, diagnose, and recover from errors</strong> - Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.</p>
      <div class="us-grid-row">
        <div class="us-col-md-6">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-errors.png">
            <p>
              <i>"Ahhhh....the ol' requested format..."</i>
            </p>
        </div>
      </div>
    </li>
    <li>
      <p><strong>Help and documentation</strong> - Any such help information should be easy to find, focused on the user's task, list concrete steps to be carried out, and not be too wordy.</p>
    </li>
  </ol>

  <a id="External-requirements"></a>
  <h2>External requirements</h2>
    <p>Sometimes design is dictated - commercial or regulatory or business.</p>
    <p>If there is flexibility around how these are implemented we can enter the design process. Sometimes there isn’t though, and they have to be implemented.</p>
    <h6>Example</h6>
      <div class="us-grid-row">
        <div class="us-col-md-6">
          <img alt="image" class="us-img--full trailered" src="/images/external-requirements.png">
            <p>
              <i>"The brand red clashes with this provider's red."</i>
            </p>
        </div>
      </div>  
</div>


<!-- When do we need validation of our designs? -->

<div class="us-content-group">
  <a id="validation"></a>
    <h2>When do we need validation?</h2>
      <p>If our change isn’t down to one of the above then it’s problem solving, so we need to structure our approach to design differently. We primarily need to understand the problem</p>
      <ul>
          <li><a href="#what-is-a-problem">What is a 'problem' and what isn't</a></li>
          <li><a href="#defining-the-problem">Defining the problem</a></li>
        </ul>
  <a id="what-is-a-problem"></a>
  <h2>What is a problem?</h2>
  <p>A problem statement is the design brief, but first we need a good problem.</p>
  <h6>Symptoms, not problems</h6>
  <p>Data tells us about results, not causes. It tells us that it looks like there is a problem, but now what the problem is. Data comes from:</p>
  <ul>
    <li>GA</li>
    <li>Fullstory</li>
    <li>Crazyegg</li>
  </ul>

  <h6>Wish lists</h6>
  <p>Business objectives are things we desire to happen. They tell us what we want to the outcome to be. Objectives sound like:</p>
  <ul>
    <li>Increase conversion by…</li>
    <li>Reduce drop out by…</li>
    <li>Stop people bouncing on…</li>
    <li>Stop people clicking out on…</li>
    <li>Get people to click on…</li>
  </ul>
  <p>These tell us there is a problem, but we don’t know what it is.</p>
  <h6>Real problems</h6>
  <p>Something we’ve observed a significant number of occasions.</p>
</div>

<a id="defining-the-problem"></a>
<div class="us-content-group">
  <h2>Defining the problem</h2>
  <h6>Start by testing</h6>
  <p>This is ‘formative’ testing. It’s open-ended, and the tasks are simply to run a comparison, or to go through a journey start to finish.</p>
  <p>'Guerilla' testing will produce a quicker/cheaper outcome, but a lower fidelity of result owing to the lack of user specification.</p>
  <h6>Digest outcomes</h6>
  <p>Define the problems encountered.</p>
  <p>Pick one problem to tackle first, otherwise it is impossible to learn which changes are helpful, and which aren't.</p>
  <p>Then frame the problem with a problem statement. A problem statement is:</p>
  <blockquote>A concise description of the issues that need to be addressed - it is specific, measurable and explains what it impacts. There are no assumptions or solutions.</blockquote>
  <h6>Design a solution</h6>
  <p>Once the problem is clearly defined, start trying to solve it (one problem at a time) with wireframes and paper prototypes. Then validate the solutions as soon as possible.</p>
  <p>'Summative' usability testing can help validate your solution, but it requires a product/prototype. Summative testing gives the user a particular task to complete that tests the solution against the problem.</p>
  <p>'Guerilla' testing will produce a quicker/cheaper outcome, but a lower fidelity of result owing to the lack of user specification.</p>
  <p>In-house testing is great for bugs/devices etc… along with device lab.</p>
</div>



<!-- Testing -->

<a id="testing"></a>
<div class="us-content-group">
  <h2>Validation</h2>
  <p>This article by Nielsen Norman Group is a great starting point to understand UX Research methods and when to apply each.</p> 
  <p>There are over 20 types of validation, including quant methods, but here at uSwitch we predominantly use the following:</p>
  <ul>
    <li><a href="#face-to-face">Face-to-face usability testing</a></li>
    <li><a href="#guerilla-testing">Guerilla testing</a></li>
    <li><a href="#in-house-testing">In-house testing</a></li>
    <li><a href="#interviews">Interviews</a></li>
  </ul>
  
  <a id="face-to-face"></a>
  <h3>Face-to-face usability testing</h3>
  <p></p>
  <h4>What</h4>
  <p></p>
  <p>This is the highest-fidelity form of validation. The feedback you receive   will be of the highest quality, but it will also take you the most time.</p> 
  <p>Face-to-face testing consists of preparing a particular task, putting it in front of real users, and seeing how they get on.</p> 
  <p>As it’s face-to-face, you can also interview users in this format, or ask them to complete exercises such as:</p>
    <ul>
      <li>Product Reaction Cards - Used to determine how desirable a product or process is</li>
      <li>Unmarked Semantic Differential Scales - Used to understand reactions to particular words and phrases</li>
      <li>Card sorting - Used to understand hierarchy of importance, or expected flows</li>
    </ul>
  <p></p>
  <h4>When</h4>
  <p></p>
  <p>Anytime. For an existing product where the objective is to discover problems, an open-ended test asking users to complete the most common journey. This should be done at least once a year.</p>
  <p>For a new product or feature face-to-face testing is always a good idea. The objective here is to test the solution against the problem using particular tasks.</p> 
  <p></p>
  <h4>How</h4>
  <p></p>
  <p>See the testing checklist for a step-by-step guide to setting up and running a test.</p>

  <a id="guerilla-testing"></a>
  <h3>Guerilla testing</h3>
  <h4>What</h4>    
  <p>A lower-fidelity version of face-to-face testing, guerilla testing sacrifices quality for speed. The feedback you receive will be of lower quality as the participants may not fit user types, and the testing environment is more ‘ad-hoc’ (think coffee shops, sandwich places).</p>
  <p>Just like face-to-face testing, guerilla testing involves preparing a particular task, putting it in front of real users, and seeing how they get on. You can also do interviews and get quant feedback but again, the feedback will be lower quality.</p> 
  <h4>When</h4>
  <p>Guerilla testing is perfect at the early stage of a design, when you want to sense check a particular flow, component, or wording.</p> 
  <p>Any fidelity of design can be used. Guerilla testing works best when kept relatively informal, and the participant feels at ease.</p>
  <h4>How</h4>
  <p>See the guerilla testing checklist for a step-by-step guide to setting up and running a test.</p>
  <p>The number of participants should be at least 5 for guerilla testing, but you can use your discretion.</p> 
  
  <a id="in-house-testing"></a>
  <h3>In-house testing</h3>
  <h4>What</h4>
  <p>Asking your colleagues in the office for feedback. This is the quickest but lowest quality form of validation.</p>  
  <p>Like guerilla testing this is an informal type of testing, but the quality is considerably lower owing to familiarity with the product, bias based on personal relationships and a mismatch between persona types and testers.</p> 
  <p>In-house testing is perfect for bug testing, seeing if anyone can ‘break’ your design, and last-minute tweaks. It is not for designed to surface flow or interaction changes.</p> 
  <h4>When</h4>
  <p>A few days before release</p>
  <h4>How</h4>
  <p>See the bug-testing checklist</p>

  <a id="interviews"></a>
  <h3>Interviews</h3>
  <h4>What</h4>
  <p>Interviews are designed to understand behaviours, needs and pain-points around a particular task.</p> 
  <p>They are open-ended and can help define design personas - archetypes that can be used as a reference point for any design changes for that product.</p>  
  <h4>When</h4>
  <p>Interviews are most commonly used at the earliest stage of product development to determine the needs/problems that the product will address.</p>     
  <h4>How</h4>
  <p>See the interview checklist</p>
</div>