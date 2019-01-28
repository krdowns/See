window.onload = function() {
  // LOGIN
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal 
  btn.onclick = function() {
  modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
  modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  // SIGNUP
  var signupModal = document.getElementById('signup-modal');

  // Get the button that opens the modal
  var signupButton = document.getElementById("signup-button");

  // Get the <span> element that closes the modal
  var signupSpan = document.getElementsByClassName("signup-close")[0];

  // When the user clicks on the button, open the modal 
  signupButton.onclick = function() {
  signupModal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  signupSpan.onclick = function() {
  signupModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == signupModal) {
          signupModal.style.display = "none";
      }
  }


  localStorage.length > 0 ? console.log(localStorage) : console.log('no local storage');

  let loggedIn ;
  let user ;

  checkForLogin();

  $('a#logout').on('click', handleLogout);
  $('#login').on('click', showLogin)
  $('#signup').on('click', showSignup)
  $('#signupForm').on('submit', submitSignup)
  $('#loginForm').on('submit', submitLogin)


  function checkForLogin(){
    if(localStorage.length > 0){
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
        console.log("you can access variable user: " , user)
          $('#message').text(`Welcome, ${ response.email || response.result.email } `)
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
    $('#yesToken').toggleClass('show');
    $('#message').text('Goodbye!')
    user = null;
    checkForLogin();
  }

  function showLogin(e){
    e.preventDefault();
    console.log('login clicked.')
    $('#loginForm').toggleClass('show')
  }

  function showSignup(e){
    e.preventDefault();
    console.log('signup clicked.')
    $('#signupForm').toggleClass('show')
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
        user = {email: json.result.email, _id: json.result._id}
        localStorage.token = json.signedJwt;
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