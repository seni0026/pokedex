// get the sign up link
const signUpLink = document.getElementById('sign-up');

// create a variable to hold the generated html
let signUpHTML = '';

// generate the sign up form html when user click the sign up link
// since the link will resort to its natural behavior by trying to load a like (even though no actual link is there)
// preventDefault() is used to stop that from happening so the generated html stays on the page
signUpLink.addEventListener('click', function (event) {
  event.preventDefault();
  signUpForm();
});

// function to generated the sign up form html and add it to the page when user click the sign up link
function signUpForm() {
    signUpHTML = `<h1>Create Account</h1>
                    <p class="form-instruction">Complete the form to create an account</p>

                    <div id="input-fields">
                        <!-- user name -->
                        <input type="text" name="userName" id="userName" placeholder="username" required>

                        <!-- email -->
                        <input type="email" name="userEmail" id="userEmail" placeholder="email" required>

                        <!-- Input box for user password -->
                        <input type="password" name="userPassword" id="userPassword" placeholder="password" required>

                        <!-- user confirm password -->
                        <input type="password" name="confirmpassword" id="confirmpassword" placeholder="confirm password" required>
                    </div>
        
                    <!-- Forgot password link -->
                    <p class="existing-account">Already have an account? <a class="existing-account-login" href="index.html">Login</a></p>

                    <p class="policy">By creating an account you agree to our <br> <a class="policy-link" href="https://en.wikipedia.org/wiki/Terms_of_service" target="_blank">Terms & Privacy</a></p>

                    <!-- Form submit button -->
                    <button type="submit" name="new-account">Sign up</button>`

                    // get the login form and change the innerHTML 
                    document.getElementById('login-form').innerHTML = signUpHTML;
}
