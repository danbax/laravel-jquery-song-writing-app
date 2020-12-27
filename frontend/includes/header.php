<?php
if(!isset($_SESSION)) 
{ 
    session_start(); 
} 

include "../language/".htmlspecialchars($_SESSION['language'])."/header.php";
?>
