<?php
    require_once (__DIR__ . "/../model/config.php");
//    Below the code unsets the variable which would log me in
    unset($_SESSION["authenticated"]);
//    Below is the code that ends my session
    session_destroy();
//    Below is the code that redirects my user after they had logged out
    header("Location: " . $path . "index.php");
    
    

