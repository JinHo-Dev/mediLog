<?php
    $conn = mysqli_connect("localhost", "godjh", "ekdldk135!", "godjh", 3306);
    $sql = "DELETE FROM DAILYMED_MEDI WHERE MEDI = '{$_POST['medi']}' AND USER = '{$_POST['id']}'";
    $result = mysqli_query($conn, $sql);
?>