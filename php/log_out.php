<?php
    // continue user session to get access to data
    session_start();

    // delete all the variables with user's data during this session
    session_unset();

    // terminate current session and remove the user's data from the server
    session_destroy();

    // redirect the user back to the login page
    header('Location: ../index.html');
    exit();
?>