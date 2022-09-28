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
    $result = $conn->query("SELECT * FROM form_data ORDER BY id DESC LIMIT 1");

    if ($result->num_rows > 0) {
        $row = $result->fetch_row();
        return $row;
    }
}

function StoreData($conn, $data) {
    // Check if data isn't already in database
    $result = $conn->query("SELECT * FROM form_data WHERE FirstName=" . $data[0] . " AND LastName=" . $data[1] . " OR Email=" . $data[3]);

    if ($result == false) {
        header("Location: form.html?connect=error");
    } else {
        if ($result->num_rows > 0) {
            $row = $result->fetch_row();
            CloseCon($conn);
            header("Location: form.html?error=true");
        }
    }
}
