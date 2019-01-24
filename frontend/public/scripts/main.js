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
}