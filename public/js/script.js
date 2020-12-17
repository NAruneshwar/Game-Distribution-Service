(function ($) {
  // let password = $("#login_btn");
  // password.submit(function (e) {
  $("#login_btn").submit(function (e) {
    e.preventDefault();
    // function passwordcheck() {
    let username = $("#username").val();
    let password = $("#password").val();
    let userData = {
      username: username,
      password: password,
    };
    console.log(username);
    $.ajax({
      url: "/login/check",
      type: "POST",
      data: userData,
      // error: function (xhr, status) {
      //   console.log("Sorry, there was a problem!");
      // },
      // complete: function (xhr, status) {
      //   console.log(xhr);
      // },
    });
  });
  //   $(document).on("change", ".password", function () {
  //     alert(this.value);
  //   });
  //   function passwordcheck(e) {
  //   $(document).on("change", ".password", function (e) {
  //   $("#password").change(function () {
  // e.preventDefault();
  //   $(document.body).on("change", "#password", function (e) {

  //   $(document).on("click", ".password", (e) => {
  //   $("input[name=password]").change(function () {
  //     e.preventDefault();
  //     alert("hello");
  //     // e.preventDefault();
  //     var password = $(this).val();
  //     if (password.length >= 8) {
  //       $("#password_charcters").show();
  //     } else {
  //       $("#password_charcters").hide();
  //     }
  //     if (password.len() >= 8) {
  //       $("#password_alpha").show();
  //     } else {
  //       $("#password_alpha").hide();
  //     }
  //     if (password.len() >= 8) {
  //       $("#password_numerical").show();
  //     } else {
  //       $("#password_numerical").hide();
  //     }
  //   });
  //   function myFunction() {
  //   $(document).on("change", ".retypepassword", (e) => {
  //   $(".retypepassword").on("change", function myFunction() {
  //   $("#retypepassword").onchange((e) => {

  $("#username").change(function () {
    var username = $("#username").val();
    $.ajax({
      url: "/login/username",
      type: "POST",
      data: username,
      error: function (xhr, status) {
        console.log("Sorry, there was a problem!");
      },
      success: function (xhr, status) {
        console.log(xhr);
      },
    });
    if (password == $(this).val()) {
      $("#checkusername").html("&#9989; Password Matched");
      $("#checkusername").show();
      $("#checkusername").css("color", "green");
      // document.getElementById("signupbtn").disabled = false;
      //   $("#signupbtn").removeAttr("disabled", "disabled");
    } else {
      $("#checkusername").html("&#10060; Password does not Match");
      $("#checkusername").show();
      $("#checkusername").css("color", "red");
      // document.getElementById("signupbtn").disabled = true;
      //   $("#signupbtn").prop("disabled", true);
    }
  });

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
        $("#matchpassword").html("&#9989; Password Matched");
        $("#matchpassword").show();
        $("#matchpassword").css("color", "green");
        // document.getElementById("#signupbtn").disabled = false;
        // $("#signupbtn").removeAttr("disabled", "disabled");
      } else {
        $("#matchpassword").html("&#10060; Password does not Match");
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
      $("#matchpassword").html("&#9989; Password Matched");
      $("#matchpassword").show();
      $("#matchpassword").css("color", "green");
      // document.getElementById("signupbtn").disabled = false;
      //   $("#signupbtn").removeAttr("disabled", "disabled");
    } else {
      $("#matchpassword").html("&#10060; Password does not Match");
      $("#matchpassword").show();
      $("#matchpassword").css("color", "red");
      // document.getElementById("signupbtn").disabled = true;
      //   $("#signupbtn").prop("disabled", true);
    }
  });
})(jQuery);
