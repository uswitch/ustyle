---
name: Usability testing
---
<body>
<p>Use this guide if you:</p>
<ul>
<li>If you are unclear where testing fits into the product development cycle
<li>If you are unclear whether testing is needed not
<li>If you are unsure what kind of test to run
<li>If you face external pressures to design something that you feel maybe wrong and have no frame of reference for that 
<li>If you need to benchmark a component, behaviour or interaction or reach consensus in the team
</ul>

<div class="us-content-group">
  <h2>When don’t we need validation of our designs?</h2>
  <p>Plenty of design changes don’t require upfront hypothesis validation</p> 
    <ul>
      <li><a href="#Site-consistency">Site consistency</a></li>
      <li><a href="#Design-conventions">Design conventions</a></li>
      <li><a href="#Usability-conventions">Usability conventions</a></li>
      <li><a href="#External-requirements">External requirements</a></li>
    </ul>

<div class="us-content-group">
<a name="Site-consistency"></a>
  <h2>Site consistency</h2>
      <p>Colour, font, shading, button types, and anything in uStyle is a given. We want to achieve site consistency for brand reasons.</p> 
      <p>Functionality, UI, hierarchy are not 'look and feel' consistency.</p> 
<h4>Example</h4>
<p>Moving the first two Broadband designs ('Oldest stlye' and 'Old style') to be more ‘in line’ with the third design ('New style') is an on-going project of consistency.</p> 

<p>Changing the colours of the first design or moving to a consistent layout would not require testing.</p> 

<p>Similarly, changing the row-data presentation in the second example to be more consistent with the third example would not require testing.</p>

<div class="us-grid-row">
    <div class="us-col-md-6">
      <i>Oldest style</i><img class="us-img--full trailered" src="/images/site-consistency01.png">
      <i>New style</i><img class="us-img--full trailered" src="/images/site-consistency03.png">
      </div>
<div class="us-col-md-6">
      <i>Old style</i><img class="us-img--full trailered" src="/images/site-consistency02.png">
    </div> 
</div>

<div class="us-content-group">
<a name="Design-conventions"></a>
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
      <img class="us-img--full trailered" src="/images/design-conventions.png">
    </div>
</div>


<div class="us-content-group">
<a name="Usability-conventions"></a>
<h2>Usability conventions</h2>

<p>The <a href="https://www.nngroup.com/articles/ten-usability-heuristics/">ten basic usability heurisitcs</a>, like basic design rules, give us a number of usability principles that must be sense-checked against. Designs that do not meet these requirements give us a clear problem to be solved without the requirement of validation. </p>

<ol>    
  
  <li>Visibility of system status - Keep users informed about what is going on through appropriate feedback within reasonable time.In the example below the user cannot see what impact selecting a dropdown option has:</li>
    <p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
         <img class="us-img--full trailered" src="/images/ux-conventions-visibility.png">
            <p>
             <i>"Did updating those filters do anything?"</i>
            </p>
        </div>
      </div>
    </p>

  <li>Match between system and the real world - Speak the users' language with words, phrases and concepts familiar to the user, rather than system-oriented terms. Follow real-world conventions, making information appear in a natural and logical order.</li>
    <p>
      <div class="us-grid-row">
        <div class="us-col-md-4">
          <img class="us-img--full trailered" src="/images/ux-conventions-real-world.png">
            <p>
              <i>"Large as in size of people or house? Doesn’t it depend what they’re doing? What’s a Plusnet safeguard?"</i>
            </p>
        </div>
      </div>
    </p>  
  
  <li>User control and freedom – If a user makes a mistake, let them undo, redo, go back, etc...</li>
    <p>
      <div class="us-grid-row">
        <div class="us-col-md-10">
          <img class="us-img--full trailered" src="/images/ux-conventions-freedom.png">
            <p>
              <i>"I wanted more details...and now i've left the site....how do I get back?”</i>
            </p>
        </div>
      </div>
    </p>  

  <li>Consistency and standards - Users should not have to wonder whether different words, situations, or actions mean the same thing.</li>
    <p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
          <img class="us-img--full trailered" src="/images/ux-conventions-CONSISTENCY.png">
            <p>
              <i>"Is a plan and a tariff the same thing?”</i>
            </p>
        </div>
      </div>
    </p>  

  <li>Error prevention - Even better than good error messages is a careful design which prevents a problem from occurring in the first place.</li>
    <p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
          <img class="us-img--full trailered" src="/images/ux-conventions-ERROR.png">
            <p>
              <i>"No deals, why did you present it as an option?"</i>
            </p>
        </div>
      </div>
    </p>  

  <li>Recognition rather than recall - Minimise the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part to another.</li>
    <p>
      <div class="us-grid-row">
        <div class="us-col-md-4">
          <img class="us-img--full trailered" src="/images/ux-conventions-RECOGNITION.png">
            <p>
              <i>"I’ve filtered these results, but by what?"</i>
            </p>
        </div>
      </div>
    </p>  

 <li>Flexibility and efficiency of use - Allow users to tailor frequent actions. 1-button checkout via Amazon, or Add to my wishlist via Airbnb.</li>
    <p>
      <div class="us-grid-row">
        <div class="us-col-md-8">
          <img class="us-img--full trailered" src="/images/ux-conventions-FLEXIBILITY.png">
            <p>
              <i>"I personalised all these details yesterday, why has it just reverted?"</i>
            </p>
        </div>
      </div>
    </p>  

 <li>Aesthetic and minimalist design - Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.</li> 
    <p>
      <div class="us-grid-row">
        <div class="us-col-md-6">
          <img class="us-img--full trailered" src="/images/ux-conventions-minimalist.png">
            <p>
              <i>"What am I supposed to do on this page?"</i>
            </p>
        </div>
      </div>
    </p>  

   <li>Help users recognise, diagnose, and recover from errors - Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.</li> 
    <p>
      <div class="us-grid-row">
        <div class="us-col-md-6">
          <img class="us-img--full trailered" src="/images/ux-conventions-errors.png">
            <p>
              <i>"Ahhhh....the ol' requested format..."</i>
            </p>
        </div>
      </div>
    </p>  

  <li>Help and documentation - Any such help information should be easy to find, focused on the user's task, list concrete steps to be carried out, and not be too wordy.<li>

<div class="us-content-group">
<a name="External-requirements"></a>
  <h2>External requirements</h2>
      <p>Sometimes design is dictated - commercial or regulatory or business.</p>
      <p>If there is flexibility around how these are implemented we can enter the design process. Sometimes there isn’t though, and they have to be implemented.</p>
        <h6>Example</h6>
          <p>
           <div class="us-grid-row">
            <div class="us-col-md-6">
              <img class="us-img--full trailered" src="/images/external-requirements.png">
                <p>
                  <i>"The brand red clashes with this provider's red."</i>
                </p>
            </div>
           </div>
          </p>  

<div class="us-content-group">

  <h2>When do we need validation?</h2>
    <p>If our change isn’t down to one of the above then it’s problem solving, so we need to structure our approach to design differently:</p>
     <ul>
      <li><a href="#what-is-a-probem">What is a 'problem' and what isn't</a></li>
      <li><a href="#defining-the-problem">Defining the problem</a></li>
    </ul>

<div class="us-content-group">
  <a name="what-is-a-problem"></a>
    <h2>What is a problem?</h2>

      <p>A problem statement is the design brief, but first we need a good problem.</p>
      
    <h6>Symptoms</h6>
      <p>Data tells us about results, not causes. It tells us that it looks like there is a problem, but now what the problem is. Data comes from:</p>
        <ul>
          <li>GA</li>
          <li>Fullstory</li>
          <li>Crazyegg</li>
        </ul>

    <p><h6>Wish lists</h6></p>
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

<div class="us-content-group">
  <a name="defining-the=-problem"></a>
    <h2>Defining the problem</h2>
      <h6>Start by testing</h6> 
        <p>This is ‘formative’ testing. It’s open-ended, and the tasks are simply to run a comparison, or to go through a journey start to finish.</p>
        <p>'Guerilla' testing will produce a quicker/cheaper outcome, but a lower fidelity of result owing to the lack of user specification.</p>

      <h6>Digest outcomes</h6>
        <p>Define the problems encountered.</p>
        <p>Pick one problem to tackle first as we need to learn from our changes.</p>
        <p>Then frame the problem with a problem statement.</p>
  
      <h6>Design a solution</h6> 
        <p>Start with wireframes and paper prototypes, and then validate the solution with as soon as possible.</p>

        <p>'Summative' usability testing can work, but it requires a product/prototype.Summative  testing gives the user a particular task to complete that tests the solution against the problem.</p>

        <p>Again 'guerilla' testing will produce a quicker/cheaper outcome, but a lower fidelity of result owing to the lack of user specification.</p>

        <p>In-house testing is great for bugs/devices etc… along with device lab.</p>

</body>