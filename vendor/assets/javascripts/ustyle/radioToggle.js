window.RadioToggle = function() {
  var message = "RadioToggle is now deprecated";
  if (window.Raven) window.Raven.captureMessage(message);
  console.warn(message);
};
