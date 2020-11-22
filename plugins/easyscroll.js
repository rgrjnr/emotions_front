function init() {
  new SmoothScroll(70, 32);
}

window.allow_scroll = true;

window.pos = document.documentElement.scrollLeft;

function SmoothScroll(speed, smooth) {
  console.log(speed, smooth);

  var moving = false;
  var frame =
    document.documentElement === document.body && document.documentElement
      ? document.documentElement
      : document.documentElement; // safari is the new IE

  document.documentElement.addEventListener("mousewheel", scrolled, {
    passive: false
  });
  document.documentElement.addEventListener("DOMMouseScroll", scrolled, {
    passive: false
  });

  function scrolled(e) {

    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e);

    var total =
      document.documentElement.scrollWidth -
      document.documentElement.offsetWidth;

    pos += -delta * speed;
    pos = Math.min(Math.max(0, pos), total);

    if (!moving & allow_scroll) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
    moving = true;

    var delta = (pos - document.documentElement.scrollLeft) / smooth;

    document.documentElement.scrollLeft += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function() {
    // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}

init();



/*import easyScroll from "easy-scroll";

/*easyScroll({
  scrollableDomEle: window,
  direction: "right",
  duration: 2000,
  easingPreset: "easeInQuad",
  scrollAmount: 1000
});
*
window.scroll_goal = 0;
window.scroll_initial = 0;
window.scroll_progress = 0;
window.is_scrolling = false;

(function() {
  function ease(t, b, c, d) {
    
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }

  function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    var total_width =
      document.documentElement.scrollWidth -
      document.documentElement.offsetWidth;
    // Multiplied by 40
    //document.documentElement.scrollLeft -= delta * 40; // Multiplied by 40
    if (!is_scrolling) {
        
      scroll_initial = document.documentElement.scrollLeft;
      scroll_goal = Math.min(
        Math.max(0, document.documentElement.scrollLeft - delta * 100)
      );
      is_scrolling = true;
      window.requestAnimationFrame(smoothScroll);
    }
  }

  window.smoothScroll = function() {
    let delta = Math.abs(scroll_initial - scroll_goal);

    scroll_progress += 1;

    if ((delta > 10) & (scroll_progress < 100) & is_scrolling) {
      document.documentElement.scrollLeft = ease(
        scroll_progress,
        scroll_initial,
        scroll_goal,
        100
      );

      window.requestAnimationFrame(smoothScroll);
    } else {
      scroll_initial = document.documentElement.scrollLeft;
      scroll_goal = document.documentElement.scrollLeft;
      scroll_progress = 0;
      is_scrolling = false;
    }

    console.table({
      inicio: scroll_initial,
      goal: scroll_goal,
      atual: document.documentElement.scrollLeft,
      progresso: scroll_progress
    });
  };

  if (document.documentElement.addEventListener) {
    // IE9, Chrome, Safari, Opera
    document.documentElement.addEventListener(
      "mousewheel",
      scrollHorizontally,
      false
    );
    // Firefox
    document.documentElement.addEventListener(
      "DOMMouseScroll",
      scrollHorizontally,
      false
    );
  } else {
    // IE 6/7/8
    document.documentElement.attachEvent("onmousewheel", scrollHorizontally);
  }

  window.requestAnimationFrame(smoothScroll);
})();
*/
