<?php

/* Database */
include 'dbconnection.php';

$data[0] = $_POST["firstName"];
$data[1] = $_POST["lastName"];
$data[2] = $_POST["gender"];
$data[3] = $_POST["email"];

$conn = OpenCon();
StoreData($conn, $data);
