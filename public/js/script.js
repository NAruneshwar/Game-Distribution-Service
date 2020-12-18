(function ($) {
  $("#password").change(function () {
    // var password = $("#password").val();
    if ($(this).val().length < 8) {
      $("#passwordchar").html("Password needs to be 8 characters or more");
      $("#passwordchar").show();
      $("#passwordchar").css("color", "red");
      $("#matchpassword").hide();
      //   document.getElementById("#signupbtn").disabled = true;
    } else {
      $("#passwordchar").empty();
      $("#passwordchar").hide();
      var retypepassword = $("#retypepassword").val();
      if (retypepassword == $(this).val()) {
        // $("#matchpassword").html("&#9989; Password Matched");
        $("#matchpassword").html("✔ Password Matched");
        $("#matchpassword").show();
        $("#matchpassword").css("color", "green");
        // document.getElementById("#signupbtn").disabled = false;
        // $("#signupbtn").removeAttr("disabled", "disabled");
      } else {
        $("#matchpassword").html("x Password does not Match");
        // $("#matchpassword").html("&#10060; Password does not Match");
        $("#matchpassword").show();
        $("#matchpassword").css("color", "red");
        // document.getElementById("signupbtn").disabled = true;
        // $("#signupbtn").prop("disabled", true);
      }
    }
  });

  $("#retypepassword").change(function () {
    var password = $("#password").val();
    if (password == $(this).val()) {
      //   $("#matchpassword").html("&#9989; Password Matched");
      $("#matchpassword").html("✔ Password Matched");
      $("#matchpassword").show();
      $("#matchpassword").css("color", "green");
      // document.getElementById("signupbtn").disabled = false;
      //   $("#signupbtn").removeAttr("disabled", "disabled");
    } else {
      $("#matchpassword").html("x Password does not Match");
      //   $("#matchpassword").html("&#10060; Password does not Match");
      $("#matchpassword").show();
      $("#matchpassword").css("color", "red");
      // document.getElementById("signupbtn").disabled = true;
      //   $("#signupbtn").prop("disabled", true);
    }
  });
})(jQuery);
