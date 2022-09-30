<?php

function OpenCon() {
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "portfolio";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connecting failed: %s\n" . $conn->$error);
    return $conn;
}

function CloseCon($conn) {
    $conn->close();
}

function GetLastRow($conn) {
    $result = $conn->query("SELECT * FROM `form_data` ORDER BY id DESC LIMIT 1;");

    if ($result->num_rows > 0) {
        $row = $result->fetch_row();
        return $row;
    }
}

function GetDataById($conn, $id) {
    $result = $conn->query("SELECT * FROM `form_data` WHERE `id`='$id';");

    if ($result->num_rows > 0) {
        $row = $result->fetch_row();
        return $row;
    }
}

function StoreData($conn, $data) {
    // Check if data isn't already in database
    $result = $conn->query("SELECT * FROM `form_data` WHERE `FirstName`='$data[0]' AND `LastName`='$data[1]' OR `Email`='$data[3]';");

    if ($result->num_rows > 0) {
        $row = $result->fetch_row();

        if ($result == false || $row[1] != $data[0]) {
            // It didn't work, so this information isn't in the database yet
            $id = InsertData($conn, $data);
            header("Location: form.php?id=$id");
        } else {
            // It worked, so (part of) this information is in the database already
            CloseCon($conn);
            header("Location: form.html?error=true&fname=$data[0]&lname=$data[1]&gender=$data[2]&email=$data[3]&id=$row[0]");
        }
    } else {
        $id = InsertData($conn, $data);
        header("Location: form.php?id=$id");
    }
}

function InsertData($conn, $data) {
    $conn->query("INSERT INTO `form_data` (`FirstName`, `LastName`, `Gender`, `Email`) VALUES ('$data[0]', '$data[1]', '$data[2]', '$data[3]');");
    $id = GetLastRow($conn)[0];
    CloseCon($conn);
    return $id;
}
