<!DOCTYPE html>
<html lang="en">
<head>
    <title>Exercise - Form - PHP</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- bootstrap, css, js links -->
    <link rel="stylesheet" href="../../../bootstrap/3/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../../bootstrap/5/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../../styles/template.css">
    <link rel="stylesheet" href="../../../styles/form.css">
</head>
<body>
    <!-- navbar -->
    <div class="navbar">
        <ul>
            <li><a href="../../../index.html">Home</a></li>
            <li><a href="../../exercises.html">Exercises</a></li>
            <li><a href="../../aboutme.html">About me</a></li>
        </ul>
    </div>

    <div class="main">
        <div class="container">
            <div class="jumbotron">
                <h1>Form exercise</h1>
            </div>

            <div class="answers">
                <?php
                /* File I/O
                    $file = "info.txt";
                    $paras = file_get_contents($file);
                    $paras = explode('&', $paras);

                    $fullname = $paras[0] . " " . $paras[1];
                    $gender = "You told us your gender is " . $paras[2];
                    $email = "And that your email address is " . $paras[3];
                */

                /* Database */
                include 'dbconnection.php';

                $conn = OpenCon();
                $data = GetLastRow($conn);
                CloseCon($conn);

                $fullname = $data[1] . " " . $data[2];
                $gender = "You told us your gender is " . $data[3];
                $email = "And that your email address is " . $data[4];

                $header = "<h2>Hello " . $fullname . "!</h2>";
                $content = "<p>" . $gender . ".<br> " . $email . "</p>";
                $footer = "<p><b>Thank you so much for reading this!</b></p></div>";

                $str = $header . $content . $footer;

                echo $str;
                ?>
            </div>
        </div>
    </div>
    
    <div class="container">
        <footer>
            <hr>
            <p>Gerben Bol &copy; 2022</p>
        </footer>
    </div>
</body>
</html>
