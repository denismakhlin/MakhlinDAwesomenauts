<?php

//Below is the code that inputs my config code into my page
require_once(__DIR__ . "/../model/config.php");
//Below is the code that says the username you put in has to be a real character
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
//Below is the code that says the password you put in has to be a real character
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

//Below is the code that creates my hashed password 

$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

$hashedPassword = crypt($password, $salt);

$query = $_SESSION["connection"]->query("INSERT INTO users SET "
        . "email = '',"
        . "username = '$username',"
        . "password = '$hashedPassword',"
        . "salt = '$salt', "
        . "exp = 0, "
        . "exp1 = 0, "
        . "exp2 = 0, "
        . "exp3 = 0, "
        . "exp4 = 0");

    $_SESSION["name"] = $username; 

    if($query) {
//    Below I redirect my user if the username is corect and It lets me know 
//    iif the usernname was correct
        echo "true"; 
//        header('Location: http://localhost/makhlind-blog/index.php');
    } 
//    Below I redirect my user if the username is incorect and It lets me know 
//    what eror it was
    else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
//        header('Location: http://localhost/makhlind-blog/index.php');
    }



    