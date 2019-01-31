window.onload = function() {
  // LOGIN

  localStorage.length > 0 ? console.log(localStorage) : console.log('no local storage');

  let loggedIn ;
  let user ;

  checkForLogin();

  $('#logout').on('click', handleLogout);
  $('#signupForm').on('submit', submitSignup)
  $('#loginForm').on('submit', submitLogin)


  function checkForLogin(){
    if(localStorage.token){
      let jwt = localStorage.token
      $.ajax({
        type: "POST", //GET, POST, PUT
        url: '/verify',  
        beforeSend: function (xhr) {   
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.token);
        }
      }).done(function (response) {
        console.log(response)
        user = { email: response.email, _id: response._id }
        localStorage.userID = user._id;
      }).fail(function (err) {
          console.log(err);
      });
      $('#yesToken').toggleClass('show');
    } else {
      $('#noToken').toggleClass('show');
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    console.log("LOGGED OUT")
    delete localStorage.token;
    delete localStorage.userID;
    $('#yesToken').toggleClass('show');
    $('#message').text('Goodbye!')
    user = null;
    checkForLogin();
  }

  function submitSignup(e){
    e.preventDefault();
    let userData = $(this).serialize()
    $.ajax({
      method: "POST",
      url: "/user/signup",
      data: userData,
      error: function signupError(e1,e2,e3) {
        console.log(e1);
        console.log(e2);
        console.log(e3);
      },
      success: function signupSuccess(json) {
        console.log(json);
        localStorage.token = json.token;
        $('#signupForm').toggleClass('show');
        $('#noToken').toggleClass('show');
        checkForLogin();
      }

    })
  }

  function submitLogin(e){
    e.preventDefault();
    console.log("LOGIN FORM SUBMITTED")
    let userData = $(this).serialize()
    console.log("LOGIN: ", userData)
    $.ajax({
      method: "POST",
      url: "/user/login",
      data: userData,
    }).done(function signupSuccess(json) {
      console.log("LOG IN SUCCESSFUL")
      console.log(json);
      localStorage.token = json.token;
      $('#noToken').toggleClass('show')
      $('#loginForm').toggleClass('show')
      checkForLogin();
    }).fail(function signupError(e1,e2,e3) {
      console.log(e2);
    })
  }
};