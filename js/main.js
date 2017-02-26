'use strict';

$(document).ready(function() {

  // Setup variables
  var ul =  $(".slider ul");
  var slide_count = ul.children().length;
  var slide_width_pc = 100.0 / slide_count;
  var slide_index = 0;

  // Set the ul width based on number of slides
  ul.css({ "width": (100 * slide_count) + "%"})

  // Find each slide and set CSS values
  ul.find("li").each(function (indx) {
    var left_percent = (slide_width_pc * indx) + "%";
    $(this).css({ "left": left_percent });
    $(this).css({ "width": (100 / slide_count ) + "%"});
  });

  // Listen for click of prev button
  $(".slider .prev").click(function() {
    slide(slide_index - 1);
  });

  // Listen for click of next button
  $(".slider .next").click(function() {
    slide(slide_index + 1);
  });

  function slide(new_slide_index) {
    // Return nothing for invalid slide index
    if(new_slide_index < 0 || new_slide_index >= slide_count) return;

    // Calculate left margin of ul
    var margin_left_pc = (new_slide_index * (-100)) + "%";

    // Move the ul using the left margin
    ul.animate({ "margin-left": margin_left_pc }, 400, function() {
      slide_index = new_slide_index;
    });
  }
});
