<?php
    $conn = mysqli_connect("localhost", "godjh", "ekdldk135!", "godjh", 3306);
    $sql = "SELECT A.MEDI, A.NAME, A.DATE, A.TERM, A.WNTK, A.ICON, A.COLR, MAX(B.TAKE) AS TAKE FROM DAILYMED_MEDI AS A LEFT JOIN DAILYMED_DATA AS B ON A.MEDI = B.MEDI WHERE A.USER = '{$_POST['id']}' GROUP BY A.MEDI";
    $result = mysqli_query($conn, $sql);
    while($row = mysqli_fetch_array($result)) {
        if($row) {
            echo $row['MEDI'] . "\t";
            echo $row['NAME'] . "\t";
            echo $row['DATE'] . "\t";
            echo $row['TERM'] . "\t";
            echo $row['WNTK'] . "\t";
            echo $row['ICON'] . "\t";
            echo $row['COLR'] . "\t";
            echo $row['TAKE'];
        }
        echo "\n";
    }
?>