---
name: Usability testing
---
<!-- Index -->

<ul class="table-of-contents">
  <li><a href="#no-validation">When don't we need user validation?</a></li>
  <li><a href="#validation">When do we need user validation?</a></li>
  <li><a href="#testing">How to test</a></li>
</ul>

<!-- Intro -->
<p>Usability testing can be used to establish problems that need solving, validate a hypothesis or to test a solution. Depending on what's required, there are different types of testing availability.</p>

<p>However, not every change needs to be tested. This page is deisgned to highlight when should and shouldn't use testing, and how we should do it when we do.</p>

<!-- When don’t we need validation of our designs? -->
<div class="us-content-group">
  <a id="no-validation"></a>
  <h2>When don’t we need validation of our designs?</h2>
  <p>Plenty of design changes don’t require upfront hypothesis validation. If the design change is due to any of the following it may not need validation from users:</p>
  <ul>
    <li><a href="#Site-consistency">Site consistency</a>.</li>
    <li><a href="#Design-conventions">Design conventions</a>.</li>
    <li><a href="#Usability-conventions">Usability conventions</a>.</li>
    <li><a href="#External-requirements">External requirements</a>.</li>
  </ul>

  <a id="Site-consistency"></a>
  <h3>Site consistency</h3>
  <p>Colour, font, shading, button types, and anything in uStyle is a given. We want to achieve site consistency for brand reasons.</p>
  <p>Functionality, UI, hierarchy are not 'look and feel' consistency.</p>
  <h4>Example</h4>
  <p>Moving the first two Broadband designs ('Oldest style' and 'Old style') to be more ‘in line’ with the third design ('New style') is an on-going project of consistency.</p>
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
  <h3>Design conventions</h3>
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
  <h3>Usability conventions</h3>
  <p>The <a href="https://www.nngroup.com/articles/ten-usability-heuristics/">ten basic usability heurisitcs</a>, like basic design rules, give us a number of usability principles that must be sense-checked against. Designs that do not meet these requirements give us a clear problem to be solved without the requirement of validation. </p>

  <h4>Visibility of system status</h4>
  <p>Keep users informed about what is going on through appropriate feedback within reasonable time. In the example below the user cannot see what impact selecting a dropdown option has because the overlay covers the results table:</p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
         <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-visibility.png">
            <p>
             <i>"Did updating those filters do anything?"</i>
            </p>
        </div>
      </div>

  <h4>Match between system and the real world</h4>
  <p>Speak the users' language with words, phrases and concepts familiar to the user, rather than system-oriented terms. Follow real-world conventions, making information appear in a natural and logical order.</p>
      <div class="us-grid-row">
        <div class="us-col-md-4">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-real-world.png">
            <p>
              <i>"Large as in size of people or house? Doesn’t it depend what they’re doing? What’s a Plusnet safeguard?"</i>
            </p>
        </div>
      </div>

  <h4>User control and freedom</h4>
  <p>If a user makes a mistake, let them undo, redo, go back, etc...</p>
      <div class="us-grid-row">
        <div class="us-col-md-10">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-freedom.png">
            <p>
              <i>"I wanted more details...and now i've left the site....how do I get back?”</i>
            </p>
        </div>
      </div>

  <h4>Consistency and standards</h4>
  <p>Users should not have to wonder whether different words, situations, or actions mean the same thing.</p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-consistency.png">
            <p>
              <i>"Is a plan and a tariff the same thing?”</i>
            </p>
        </div>
      </div>

   <h4>Error prevention</h4>
   <p>Even better than good error messages is a careful design which prevents a problem from occurring in the first place.</p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-error.png">
            <p>
              <i>"No deals, why did you present it as an option?"</i>
            </p>
        </div>
      </div>

    <h4>Recognition rather than recall</h4>
    <p>Minimise the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part to another.</p>
      <div class="us-grid-row">
        <div class="us-col-md-4">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-recognition.png">
            <p>
              <i>"I’ve filtered these results, but by what?"</i>
            </p>
        </div>
      </div>

    <h4>Flexibility and efficiency of use</h4>
    <p>Allow users to tailor frequent actions. 1-button checkout via Amazon, or Add to my wishlist via Airbnb.</p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-flexibility.png">
            <p>
              <i>"I personalised all these details yesterday, why has it just reverted?"</i>
            </p>
        </div>
      </div>

    <h4>Aesthetic and minimalist design</h4>
    <p>Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.</p>
      <div class="us-grid-row">
        <div class="us-col-md-6">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-minimalist.png">
            <p>
              <i>"What am I supposed to do on this page?"</i>
            </p>
        </div>
      </div>

    <h4>Help users recognise, diagnose, and recover from errors</h4>
    <p>Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.</p>
      <div class="us-grid-row">
        <div class="us-col-md-6">
          <img alt="image" class="us-img--full trailered" src="/images/ux-conventions-errors.png">
            <p>
              <i>"Ahhhh....the ol' requested format..."</i>
            </p>
        </div>
      </div>

    <h4>Help and documentation</h4>
    <p>Any such help information should be easy to find, focused on the user's task, list concrete steps to be carried out, and not be too wordy.</p>

  <a id="External-requirements"></a>
  <h3>External requirements</h3>
    <p>Sometimes design is dictated - commercial or regulatory or business.</p>
    <p>If there is flexibility around how these are implemented we can enter the design process. Sometimes there isn’t though, and they have to be implemented.</p>
    <h4>Example</h4>
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
    <p>If our change isn’t down to one of the above then it’s problem solving, so we need to structure our approach to design differently - we  need to <strong>understand the problem</strong> first.</p>

    <h3>Symptoms not problems</h3>
    <p>A problem statement is the design brief, but first we need a good problem.</p>
    <p>Data tells us about results, not causes. It tells us that it looks like there is a problem, but now what the problem is. Data comes from:</p>
    <ul>
      <li>Google Analytics.</li>
      <li>Fullstory.</li>
      <li>Crazyegg.</li>
    </ul>
    <p>Similarly business objectives are things we desire to happen. They tell us what we want to the outcome to be. Objectives sound like:</p>
    <ul>
      <li>Increase conversion by…</li>
      <li>Reduce drop out by…</li>
      <li>Stop people bouncing on…</li>
      <li>Stop people clicking out on…</li>
      <li>Get people to click on…</li>
    </ul>
    <p>These tell us there is a problem, but we don’t know what it is.</p>
    <p>A real problems is something we’ve observed a significant number of occasions.</p>

    <h3>How to define the problem</h3>
    <p>Testing designed to steer design, or validate assumptions about what problems users are encountering, is known as ‘formative’ testing. It’s open-ended, and the tasks are simply to run a comparison, or to go through a journey start to finish.</p>
    <p>Any type of testing, whether it be face-to-face, guerilla, remote, or interviews, can help define the problem. This allows us to frame the problem with a problem statement. A problem statement is:</p>
    <blockquote>A concise description of the issues that need to be addressed - it is specific, measurable and explains what it impacts. There are no assumptions or solutions.</blockquote>

    <h3>Only with a problem can you design a solution</h3>
    <p>Once the problem is clearly defined, start trying to solve it (one problem at a time), but remember to validate the solutions as soon as possible.</p>
    <p>'Summative' usability testing can help validate. Summative testing gives the user a particular task to complete that tests the solution against the problem. Again, any type of testing can perform this function.</p>

    <h3>But wait!</h3>
    <p>User testing is great to validate flows, designs and interactions, but it's not exhaustive. There might be bugs, or solutions that don't work in certain scenarios. This is where in-house testing and the device lab comes in.</p>
</div>



<!-- Testing -->

<a id="testing"></a>
<div class="us-content-group">
  <h2>How to test</h2>
  <p>So what type of testing should we use, and when?</p>
  <a href="https://www.nngroup.com/articles/which-ux-research-methods/">This article by Nielsen Norman Group</a> is a great starting point to understand testing methods and when to apply each.</p>
  <p>There are over 20 types of validation, including quant methods, but here at uSwitch we predominantly use the following:</p>
  <ul>
    <li><a href="#interviews">Interviews</a>.</li>
    <li><a href="#face-to-face">Face-to-face usability testing</a>.</li>
    <li><a href="#guerilla-testing">Guerilla testing</a>.</li>
    <li><a href="#in-house-testing">In-house testing</a>.</li>
  </ul>

  <a id="interviews"></a>
  <h3>Interviews</h3>
  <p>Interviews are designed to understand behaviours, needs and pain-points around a particular task.</p>
  <p>They are open-ended and can help define design personas - archetypes that can be used as a reference point for any design changes for that product.</p>
  <h4>How</h4>
  <p>See the interview checklist.</p>
  <h4>When</h4>
  <p>Interviews are most commonly used at the earliest stage of product development to determine the needs/problems that the product will address.</p>

  <a id="face-to-face"></a>
  <h3>Face-to-face usability testing</h3>
  <p>Face-to-face testing can be used in a formative or summative sense, and can be combined with an interview and simple exercises, like card sorting.</p>
  <p>This is the highest-fidelity form of validation. The feedback you receive   will be of the highest quality, but it will also take you the most time.</p>

  <h4>How</h4>
  <p>Face-to-face testing consists of preparing a particular task, putting it in front of real users, and seeing how they get on.</p>
  <p>As it’s face-to-face, you can also interview users in this format, or ask them to complete exercises such as:</p>
  <ul>
    <li>Product Reaction Cards - Used to determine how desirable a product or process is.</li>
    <li>Unmarked Semantic Differential Scales - Used to understand reactions to particular words and phrases.</li>
    <li>Card sorting - Used to understand hierarchy of importance, or expected flows.</li>
  </ul>
  <p>See the testing checklist for a step-by-step guide to setting up and running a test. The most crucial components are:</p>
  <ul>
  <li>Goals - What are you trying to achieve?</li>
  <li>Tasks - Every task you ask a user to complete should answer a question you need answered. Formative testing on an exisiting product will have open-ended goals, whereas tasks designed to test a solution should be specific.</li>
  <li>Test plan - Script, scenario, tasks, participants, questions, anything the moderators needs. Write it all down so you have it to hand during the test.</li>
  <li>Test the test - Something will go wrong, promise, so test it first.</li>
  <li>Get your team involved - There's nothing like seeing your solution fail first hand.</li>
  </ul>
  <h4>When</h4>
  <p>Anytime. For an existing product where the objective is to discover problems, an open-ended test asking users to complete the most common journey. This should be done at least once a year.</p>
  <p>For a new product or feature face-to-face testing is always a good idea. The objective here is to <strong>test the solution against the problem</strong> using particular tasks.</p>

  <a id="guerilla-testing"></a>
  <h3>Guerilla testing</h3>
  <p>A lower-fidelity version of face-to-face testing, guerilla testing sacrifices quality for speed. The feedback you receive will be of lower quality as the participants may not fit user types, and the testing environment is more ‘ad-hoc’ (think coffee shops, sandwich places).</p>
  <p>Just like face-to-face testing, guerilla testing involves preparing a particular task, putting it in front of real users, and seeing how they get on. You can also do interviews and get quant feedback but again, the feedback will be lower quality.</p>
  <h4>How</h4>
  <p>See the guerilla testing checklist for a step-by-step guide to setting up and running a test.</p>
  <p>The number of participants should be at least 5 for guerilla testing, but you can use your discretion.</p>
  <h4>When</h4>
  <p>Guerilla testing is perfect at the early stage of a design, when you want to sense check a particular flow, component, or wording.</p>
  <p>Any fidelity of design can be used. Guerilla testing works best when kept relatively informal, and the participant feels at ease.</p>

  <a id="in-house-testing"></a>
  <h3>In-house testing</h3>
  <p>Asking your colleagues in the office for feedback. This is the quickest but lowest quality form of validation.</p>
  <p>Like guerilla testing this is an informal type of testing, but the quality is considerably lower owing to familiarity with the product, bias based on personal relationships and a mismatch between persona types and testers.</p>
  <p>In-house testing is perfect for bug testing, seeing if anyone can ‘break’ your design, and last-minute tweaks. It is not designed for surface flow or interaction changes.</p>
  <h4>How</h4>
  <p>See the bug-testing checklist.</p>
  <h4>When</h4>
  <p>A few days before release.</p>

</div>
