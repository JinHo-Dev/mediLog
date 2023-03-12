<?php
    $conn = mysqli_connect("localhost", "godjh", "ekdldk135!", "godjh", 3306);
    $sql = "SELECT TAKE FROM DAILYMED_DATA WHERE USER = '{$_POST['id']}' AND MEDI = '{$_POST['medi']}' ORDER BY TAKE DESC LIMIT 100";
    $result = mysqli_query($conn, $sql);
    while($row = mysqli_fetch_array($result)) {
        echo $row['TAKE'];
        echo "\n";
    }
?>