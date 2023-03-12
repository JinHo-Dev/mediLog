<?php
    $conn = mysqli_connect("localhost", "godjh", "ekdldk135!", "godjh", 3306);
    $sql = "INSERT INTO DAILYMED_DATA VALUES (0, '{$_POST['medi']}', '{$_POST['id']}', NOW())";
    $result = mysqli_query($conn, $sql);
?>