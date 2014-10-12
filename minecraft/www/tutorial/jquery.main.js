$(document).ready(function() {
  $('#nav li.search').click(open_searchbar);
  $('#nav li.menu').click(open_mobile_menu);
  $('#nav li.close-menu').click(close_mobile_menu);
  $('ul#archive li.year h4 a').click(open_archive);
  $('ul.downloads li .image-more').click(click_downloads_image_more);

  detect_pi_browser();

  if ($('body').hasClass('blog') && !$('body').hasClass('rpi') && $(window).width() > 1050) {
    $('.sidebar .posts ul li').click(click_blog_sidebar_item);
    $(window).on('scroll', scroll_blog_sidebar);
  }

  if ($('body').hasClass('single-post')) {
    $('a.open-comments-top').click(toggle_comments_top);
    $('a.open-comments-bottom').click(toggle_comments_bottom);
  }
});

function detect_pi_browser() {
  var agent = navigator.userAgent.toLowerCase();

  var pi_browsers = [
        'midori',
        'epiphany',
        'dillo',
    ];

  for (var i=0; i<=pi_browsers.length; i++) {
    var browser = pi_browsers[i];

    if (agent.indexOf(browser) > -1) {
      $('body').addClass('rpi');
    }
  }
}

function open_searchbar() {
  $('#header form.search').toggleClass('open');
  $('#header form.search input.search').focus();
  return false;
}

function open_mobile_menu() {
  $('#nav ul').addClass('open');
  $('#header form.search').removeClass('open');
  return false;
}

function close_mobile_menu() {
  $('#nav ul').removeClass('open');
  return false;
}

function click_downloads_image_more() {
  $('ul.downloads li').addClass('open');
  $('ul.downloads li .image-details.sha1').show();
  $('ul.downloads li .image-more').hide();
  return false;
}

function click_blog_sidebar_item() {
  $('.sidebar .posts ul li').removeClass('active');
  $(this).addClass('active');
}

function scroll_blog_sidebar() {
  var header_height = 60;
  var wpadmin_height = $('#wpadminbar').height();
  var default_sidebar_top = 100 + wpadmin_height;
  var scroll_point = window.pageYOffset + header_height;

  $('.posts .anchor').each(function() {
    var id = $(this).attr('id');

    if (scroll_point > $(this).position().top) {
      $('.sidebar .posts ul li').removeClass('active');
      $('#postlink-' + id).addClass('active');
    }
  });

  var footer_top = $('#social-icons').position().top;
  var sidebar_height = $('.sidebar').height();
  var window_height = $(window).height();

  var window_bottom = scroll_point + window_height;
  var footer_offset = footer_top + wpadmin_height;
  var footer_diff = window_bottom - footer_offset;

  var visible_footer = Math.max(footer_diff, 0);
  var sidebar_top = default_sidebar_top - visible_footer;

  $('.sidebar').css('top', sidebar_top);
}

function open_archive() {
  $(this).parent().parent().toggleClass('open');
    return false;
}

function toggle_comments_top() {
  toggle_comments();
  return true;
}

function toggle_comments_bottom() {
  toggle_comments();
  return false;
}

function toggle_comments() {
  $('.comments h2.comments-title').toggleClass('open');
  $('ol.commentlist').toggleClass('open');
  $('.comment-respond').toggleClass('open');
}
