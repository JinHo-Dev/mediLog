<?php
    $conn = mysqli_connect("localhost", "godjh", "ekdldk135!", "godjh", 3306);
    $sql = "INSERT INTO DAILYMED_USER VALUES (0, NOW(), NOW())";
    $result = mysqli_query($conn, $sql);
    $sql = "SELECT LAST_INSERT_ID() AS A";
    $result = mysqli_query($conn, $sql);
    while($row = mysqli_fetch_array($result)) {
        echo $row['A'];
    }
?>