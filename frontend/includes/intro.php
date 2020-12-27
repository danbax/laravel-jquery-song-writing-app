<?php
if(!isset($_SESSION))
{ 
    session_start();
}


error_reporting(E_ALL);
ini_set('display_errors', 1);

$language = $_SESSION['language'];
include_once "language/$language.php";

?>

                


      
