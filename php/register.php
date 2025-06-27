<?php
// starting a session allows data to be stored that can be access across different pages when the user is logged in
    session_start();

    // import the config.php file which has the data to connect to the database
    require_once 'config.php';

    // for sign up
    // if the form is submitted, get the user data and store it in variables
    // the isset() is used to check if the user submits the form
    // $_POST is a super global associative array variable
    // it is predefined by php to get and hold data from a form sent by post method
    if(isset($_POST['new-account'])) {
        // using the $_POST[] to access the data the user submit and store it in a variable
        $username = $_POST['userName'];
        $email = $_POST['userEmail'];
        // the password is encrypted using the password_hash()
        $userpassword = password_hash($_POST['userPassword'], PASSWORD_DEFAULT);

        // search the database to see if email already exist and store it in a variable
        $checkEmail =$access->query("SELECT email FROM pokedex_user_info WHERE email = '$email'");

        // if the email already exists, num_rows (php built in property) stores the number of rows it is found in
        if($checkEmail->num_rows > 0) {
            // set a session variable to store a message
            $_SESSION['signup_error'] = 'Email is already register';
            // $_SESSION['active_form'] = 'register';
        } else {
            // if the email does not exist
            // create the info in the database table
            $access->query("INSERT INTO pokedex_user_info (name, email, password) VALUES ('$username', '$email', '$userpassword')");
        }

        // direct the user to a success page after signing up
        header('Location: ../success.html');
        exit();
    }

    // for login
    if(isset($_POST['login-btn'])) {
        $username = $_POST['userName'];
        $password = $_POST['userPassword'];

        $result = $access->query("SELECT * FROM pokedex_user_info WHERE name = '$username'");

        if($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if(password_verify($password, $user['password'])) {
                $_SESSION['name'] = $user['name'];
                $_SESSION['email'] = $user['email'];

                header('Location: dashboard.php');
            }
            exit();
        }

        $_SESSION['login-error'] = 'Incorrect username or password';

        header('Location: ../index.html');
        exit();
    }
?>