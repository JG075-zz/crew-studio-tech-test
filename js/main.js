// check page has loaded
$(document).ready(function() {
  // on right button click
  $('.button-right').on('click', function() {
    var currentTip = $('#tip-1');
    var nextTip = $('#tip-2');

    // move currentTip to the right
    currentTip.addClass('right-transition');
    nextTip.removeClass('hide-tip');

    //hide currentTip after transition time and transition nextTip
    setTimeout(function() {
      currentTip.addClass('hide-tip');
      nextTip.removeClass('waiting-left');
    }, 500);
  });

  $('.button-left').on('click', function() {
    var currentTip = $('#tip-2');
    var prevTip = $('#tip-1');

    // move currentTip to the left
    currentTip.addClass('left-transition');

    // after moving to the left, hide the tip and show the next one
    setTimeout(function() {
      currentTip.addClass('hide-tip');
      prevTip.show();
      prevTip.removeClass('right-transition');
    }, 500);
  });

});

// poster frame click event
$(document).on('click','.js-videoPoster',function(ev) {
  ev.preventDefault();
  var $poster = $(this);
  var $wrapper = $poster.closest('.js-videoWrapper');
  videoPlay($wrapper);
});

// play the targeted video (and hide the poster frame)
function videoPlay($wrapper) {
  var $iframe = $wrapper.find('.js-videoIframe');
  var src = $iframe.data('src');
  // hide poster
  $wrapper.addClass('videoWrapperActive');
  // add iframe src in, starting the video
  $iframe.attr('src',src);
}

// stop the targeted/all videos (and re-instate the poster frames)
function videoStop($wrapper) {
  // if we're stopping all videos on page
  if (!$wrapper) {
    var $wrapper = $('.js-videoWrapper');
    var $iframe = $('.js-videoIframe');
  // if we're stopping a particular video
  } else {
    var $iframe = $wrapper.find('.js-videoIframe');
  }
  // reveal poster
  $wrapper.removeClass('videoWrapperActive');
  // remove youtube link, stopping the video from playing in the background
  $iframe.attr('src','');
}
