<?php
    require_once(__DIR__ ."/../model/config.php");
    
    $array = array(
        'exp' => '',
        'exp1' => '',
        'exp2' => '',
        'exp3' => '',
        'exp4' => '',
);
    
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    
//    Below is the code that collects my salt and password from my username
//    where my username is my '$username'  this will be selscted by the query
    $query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");
    
    
    if($query->num_rows === 1) {
//        Below the code gets the fetch array and puts/stores it in $row
//        The cript function makes it matter if text is lower and upper case
        $row = $query->fetch_array();
        
        if($row["password"] === crypt($password, $row["salt"])) {
//            Below is the code that uses a session variable to make sure you 
//            are logged in, and will keep you logged in within the whole 
//            website
            $_SESSION["authenticated"] = true;
            $array["exp"] = $row["exp"];
            $array["exp1"] = $row["exp1"];
            $array["exp2"] = $row["exp2"];
            $array["exp3"] = $row["exp3"];
            $array["exp4"] = $row["exp4"];
            $_SESSION["name"] = $username;
            echo json_encode($array);
//    Below the code redirects me back to the index page if the username or 
//    password is correct
            header('Location: http://localhost/makhlind-blog/index.php');
        }
//    Below the code redirects me back to the page if the username or password 
//    is incorrect
        else {
            echo "<p>Invalid username and password</p>";
            header('Location: http://localhost/makhlind-blog/login.php');
        }
    }
//    Below the code redirects me back to the page if the username or password 
//    is incorrect
    else {
        echo "<p>Invalid username and password</p>";
        header('Location: http://localhost/makhlind-blog/login.php');
    }