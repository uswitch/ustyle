$("#togglepageslider").on 'click', ->
  if $("#us-pageslider").hasClass "whichsim-opened"
    $("#us-pageslider").removeClass "whichsim-opened"
  else
    $("#us-pageslider").addClass "whichsim-opened"