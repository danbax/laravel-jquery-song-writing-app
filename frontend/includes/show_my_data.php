<?php

session_start();
include "../language/".htmlspecialchars($_SESSION['language'])."/show_my_data.php";

if(isset($_SESSION['u_id'])){
    include '../sqlConnect.php';
    $u_id = htmlspecialchars($_SESSION['u_id']);
?>

<script>
    $( document ).ready(function() {
        
       
        
        
        
      });
</script>
        <br>
 
<?php include '../server/getSongs.php'; } ?>