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
      complete: function (returnData) {
        if (returnData !== "true") {
          $("#checkusername").html("this username is already taken.");
          $("#checkusername").show();
        } else {
          $("#checkusername").empty();
          $("#checkusername").hide();
        }
      },
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
    let username = $("#username").val();
    // alert($("#username").val());
    // alert(username);
    $.ajax({
      url: "signup/username",
      type: "POST",
      data: $("#username").val(),
      error: function (xhr, status) {
        console.log("Sorry, there was a problem!");
        // $("#checkusername").html("this username is already taken.");
        // $("#checkusername").show();
      },
      success: function (returnData) {
        if (returnData !== "true") {
          $("#checkusername").html("this username is already taken.");
          $("#checkusername").show();
        } else {
          $("#checkusername").empty();
          $("#checkusername").hide();
        }
      },
    });
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
