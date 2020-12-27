<?php
if(!isset($_SESSION)) 
{ 
    session_start(); 
} 

include "../language/".htmlspecialchars($_SESSION['language'])."/header.php";
?>
<!--Main Navigation-->
  <header>

    <!-- Navbar -->
    <nav class="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
      <div class="container-fluid">

        <!-- Brand -->
        <a class="navbar-brand waves-effect" target="_blank">
          <strong class="blue-text"><?=$lang["header_title"]?></strong>
        </a>
    
        
        <!-- Collapse -->
        <button id='navbarToogler' class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div id='navbarLinks'>
          <!-- Left -->
          <ul class="navbar-nav mr-auto">
              <?php 
                    if(isset($_SESSION['u_id'])){
              ?>
            <li class="nav-item">
              <a class="nav-link waves-effect" id="mySongs"><?=$lang["header_mySongs"]?></a>
            </li>
            <li class="nav-item">
              <a class="nav-link waves-effect" onclick="signOut()"><?=$lang["header_logout"]?></a>
            </li>
            
    <script>
        $( document ).ready(function() {
           $( "#mySongs" ).click(function() {
                   $("#pageContent").hide("slow");
                   $("#pageContent").load("includes/show_my_data.php");
                   $("#pageContent").show("slow");
           });
        });
     </script>
                <?php
                }else{
                ?>
            <li class="nav-item">
              <a class="nav-link waves-effect" id="login"><?=$lang["header_login"]?></a>
            </li>
            
    <script>
        $( document ).ready(function() {
           $( "#login" ).click(function() {
                   $("#pageContent").hide("normal");
                   $("#pageContent").load("includes/login.php");
                   $("#pageContent").show("normal");
           });
        });
     </script>
            
                <?php
                }
                ?>
          </ul>

        </div>
        </div>
      </div>
    </nav>
    <!-- Navbar -->
  </header>
  <!--Main Navigation-->