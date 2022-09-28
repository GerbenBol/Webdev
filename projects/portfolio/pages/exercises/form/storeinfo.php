<?php

/* File I/O
    $file = "info.txt";
    $info = $_POST["firstName"] . "&" . $_POST["lastName"] . "&" .
        $_POST["gender"] . "&" . $_POST["email"];
    file_put_contents($file, $info);

    // Move on to view
    header("Location: form.php");
*/

/* Database */
include 'dbconnection.php';

$data[0] = $_POST["firstName"];
$data[1] = $_POST["lastName"];
$data[2] = $_POST["gender"];
$data[3] = $_POST["email"];

$conn = OpenCon();
StoreData($conn, $data);
CloseCon($conn);
