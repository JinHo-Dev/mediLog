<?php
    $conn = mysqli_connect("localhost", "godjh", "ekdldk135!", "godjh", 3306);
    $sql = "SELECT COUNT(USER) AS A FROM DAILYMED_USER WHERE USER = '{$_POST['id']}'";
    $result = mysqli_query($conn, $sql);
    while($row = mysqli_fetch_array($result)) {
        echo $row['A'];
    }
?>