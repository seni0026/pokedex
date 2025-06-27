<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
    // store the database server address
    // since the database is on the same server as the php files the value is localhost
    $host = 'localhost';
    // store the username used for the server to connect to the database
    // since MAMP is the server, the username is root by default
    $user = 'root';
    // store the password for the database
    $password = 'root';
    // store the name of the database that will be worked with
    $database = 'pokedex_user';

    // create access to the database by using the mysqli class and store it in a variable
    $access = new mysqli($host, $user, $password, $database);

    // if the server cannot access the database, stop the script and display a message
    // connect_error is a php property that stores an a message if something went wrong while connecting to the database
    if($access->connect_error) {
        die('Connection failed: '. $access->connect_error);
    }
?>