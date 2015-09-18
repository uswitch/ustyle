window.Backdrop = (function() {
  var backdrop, createBackdrop, holds;

  backdrop = null;

  holds = 0;

  function Backdrop() {
    backdrop = document.querySelector('.us-backdrop');
    if (backdrop == null) {
      backdrop = createBackdrop();
    }
  }

  Backdrop.prototype.element = backdrop;

  createBackdrop = function() {
    backdrop = document.createElement('div');
    Utils.addClass(backdrop, 'us-backdrop');
    return document.body.appendChild(backdrop);
  };

  Backdrop.prototype.retain = function() {
    var onFrame;
    holds++;
    if (holds === 1) {
      Utils.addClass(backdrop, 'us-backdrop--visible');
      onFrame = function() {
        if (holds >= 1) {
          return Utils.addClass(backdrop, 'us-backdrop--active');
        }
      };
      return Utils.requestAnimationFrame.call(window, onFrame);
    }
  };

  Backdrop.prototype.release = function() {
    var onFrame;
    if (holds === 1) {
      Utils.removeClass(backdrop, 'us-backdrop--active');
      onFrame = function() {
        return setTimeout(function() {
          if (holds === 0) {
            return Utils.removeClass(backdrop, 'us-backdrop--visible');
          }
        }, 300);
      };
      Utils.requestAnimationFrame.call(window, onFrame);
    }
    return holds = Math.max(0, holds - 1);
  };

  return Backdrop;

})();