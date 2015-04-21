<!--Below is the starting tag you need to begin writing php code it is not
closed like it is in my index.php page-->
<?php

require_once(__DIR__ . "/database.php");
session_start();
//The code below regenerates a session with a new id and delete the old session
session_regenerate_id(true);

//Below is the code that stores the path to my project
$path = "/MakhlinDAwesomenauts/php/";
      
//Below is code that says everything on the right will be stored in the right 
//variable which is my local host which is my main host
    $host = "localhost";
//    You need a username to connect to my server
    $username = "root";
//    You need a password to connect to my server    
    $password = "root";
//This is the name of my database 
    $database = "awesomenauts_db"; 
//Below my if statement is checking if the connection  is set if it is it will
//run the code inside it
    if(!isset($_SESSION["connection"])) {
    //Below is the code that allows me to accses my mysqli server and the code in my 
    //datababse to be stored in the connection object 
        $connection = new Database($host, $username, $password, $database);
        $_SESSION["connection"] = $connection;
    } 
   

