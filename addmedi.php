<?php
    $conn = mysqli_connect("localhost", "godjh", "ekdldk135!", "godjh", 3306);
    $sql = "INSERT INTO DAILYMED_MEDI VALUES (0, '{$_POST['id']}', '{$_POST['name']}', '{$_POST['date']}', '{$_POST['term']}', '{$_POST['wntk']}', '{$_POST['icon']}', '{$_POST['colr']}')";
    $result = mysqli_query($conn, $sql);
?>