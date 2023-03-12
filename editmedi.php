<?php
    $conn = mysqli_connect("localhost", "godjh", "ekdldk135!", "godjh", 3306);
    $sql = "UPDATE DAILYMED_MEDI SET NAME = '{$_POST['name']}', DATE = '{$_POST['date']}', TERM = '{$_POST['term']}', WNTK = '{$_POST['wntk']}', ICON = '{$_POST['icon']}', COLR = '{$_POST['colr']}' WHERE MEDI = '{$_POST['medi']}' AND USER = '{$_POST['id']}'";
    $result = mysqli_query($conn, $sql);
?>