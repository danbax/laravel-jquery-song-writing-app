<?php
session_start();
include "../language/".htmlspecialchars($_SESSION['language'])."/search.php";
include "language/".htmlspecialchars($_SESSION['language'])."/search.php";

include '../sqlConnect.php';
$u_id = htmlspecialchars($_SESSION['u_id']);

