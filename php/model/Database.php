<?php

class Database {

//Below are global variables that are set as private so they can only be
//accessed within this class
    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;

//Below I am adding information into my global variables to add to my object
    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;

        $this->connection = new mysqli($host, $username, $password);
//Below is the code that checks if I have a connection error
        if ($this->connection->connect_error) {
//Below is code that kills my program if I have an error and it says what the
//error was
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
//Below is the code that tries to access a database on MYSQLI server    
        $exists = $this->connection->select_db($database);
//Below is the code I use to test if the $exists database is working
        if (!$exists) {
//Below is the code that created my database using its connection
            $query = $this->connection->query("CREATE DATABASE $database");
//Below is the code that says if my ddatabase was created the  it will echo/say
//Successfully created database
            if ($query) {
                echo "<p>Successfully created database: " . $database . "</p>";
            }
//Below is the code using an else statement to say that it will echo out  
//Database already exists     
        } else {
            echo "<p>Database already exists</p>";
        }
    }

    public function openConnection() {
//    Below Is the code that I established my connection in
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) {
//Below is code that kills my program if I have an error and it says what the
//error was
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
    }

//Below is the code that closes my connection
    public function closeConnection() {
        if (isset($this->connection)) {
            $this->connection->close();
        }
    }

    public function query($string) {
//Below is the code that opens my connection so I can test it
        $this->openConnection();
//Below is the code that tests my query connection
        $query = $this->connection->query($string);
//Below I am setting the error class
        if(!$query) {
            $this->error = $this->connection->error;
        }

//Below is the code that closes my connection

        $this->closeConnection();

        return $query;
    }

}
