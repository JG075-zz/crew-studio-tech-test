'use strict';

$(document).ready(function() {

  // Setup variables
  var ul =  $(".slider ul");
  var slide_count = ul.children().length;
  var slide_width_pc = 100.0 / slide_count;
  var slide_index = 0;
  var img_start_name = "tip";
  var img_locations = "img/sleep-tips/seq"
  var imgs_loaded = false;

  // Set the ul width based on number of slides
  ul.css({ "width": (100 * slide_count) + "%"})

  // Find each slide and set CSS values
  ul.find("li").each(function (index) {
    var left_percent = (slide_width_pc * index) + "%";
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
    // Load the slides images if it's the first click
    if(slide_index === 0 && imgs_loaded === false) {
      loadImages();
      imgs_loaded = true;
    }
  });

  function slide(new_slide_index) {
    // Return nothing for invalid slide index
    if(new_slide_index < 0 || new_slide_index >= slide_count) return;

    // Calculate left margin of ul
    var margin_left_pc = (new_slide_index * (-100)) + "%";

    // Move the ul using the left margin
    ul.animate({ "margin-left": margin_left_pc }, 400, function() {
      slide_index = new_slide_index;
      animateImg();
    });

    // Change the image to make it look animated
    function animateImg() {
      setTimeout(function() {
        ul.find("li:nth-child(" + (slide_index + 1) + ")").find("img").attr("src", createImgSrc(slide_index, true));
      }, 300);
    }
  }

  function loadImages() {
    // Adjust the image src for every slide after the first two
    ul.find("li").each(function(index){
      if(index > 1) {
        $(this).find("img").attr("src", createImgSrc(index));
      }
    });
  }

  function createImgSrc(index, next = false) {
    // Don't add _0 to numbers after 9 i.e. _09 but not _010
    var preNum = (index + 1) > 9 ? "_" : "_0";
    // Append _2 if it should display the next image
    var append = next ? "_2" : "_1";
    return img_locations + "/" + img_start_name + preNum + (index + 1) + append + ".jpg";
  }

});
