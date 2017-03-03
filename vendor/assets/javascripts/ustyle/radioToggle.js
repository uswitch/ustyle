window.RadioToggle = function () {
  var message = 'RadioToggle is now depricated';
  if (window.Raven) window.Raven.captureMessage(message);
  console.warn(message);
};
