$('document').ready(function() {

  // display validation errors for the "request invitation" form
  if ($('.alert-error').length > 0) {
    $("#request-invite").modal('toggle');
  }

  // use AJAX to submit the "request invitation" form
  $('#invitation_button').on('click', function() {
    var email = $('form #user_email').val();
    var first_name = $('form #user_first_name').val();
    var last_name = $('form #user_last_name').val();
    var twitter_handle = $('form #user_twitter_handle').val();
  
    var dataString = {
                      user: {
                        "email": email,
                        "first_name": first_name,
                        "last_name": last_name,
                        "twitter_handle" : twitter_handle
                        }
                      }
    // var dataString = 'user[email]='+ email;
    // console.log(dataString)
    $.ajax({
      type: "POST",
      url: "/users",
      data: dataString,
      success: function(data) {
        $('#request-invite').html(data);
        loadSocial();
      }
    });
    return false;
  });

  $('a[data-toggle=modal]').on('click', function() {
    return $('.dropdown').removeClass('open');
  });

  $('a[data-target=#ajax-modal]').on('click', function() {
    e.preventDefault();
    e.stopPropagation();
    $('body').modalmanager('loading');
    return $.rails.handleRemote($(this));
  });

  $(document).on('click', '[data-dismiss=modal], .modal-scrollable', function() {
    return $('.modal-body-content').empty();
  });

  $(document).on('click', '#ajax-modal', function(e) {
    return e.stopPropagation();
  });

})

// load social sharing scripts if the page includes a Twitter "share" button
function loadSocial() {

    //Twitter
    if (typeof (twttr) != 'undefined') {
      twttr.widgets.load();
    } else {
      $.getScript('http://platform.twitter.com/widgets.js');
    }

    // //Facebook
    // if (typeof (FB) != 'undefined') {
    //   FB.init({ status: true, cookie: true, xfbml: true });
    // } else {
    //   $.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function () {
    //     FB.init({ status: true, cookie: true, xfbml: true });
    //   });
    // }

    //Google+
    if (typeof (gapi) != 'undefined') {
      $(".g-plusone").each(function () {
        gapi.plusone.render($(this).get(0));
      });
    } else {
      $.getScript('https://apis.google.com/js/plusone.js');
    }
}


