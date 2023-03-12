<?php
    header("Content-Type: text/html");
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, "https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService03/getDrugPrdtPrmsnDtlInq02?serviceKey=PMOj%2FbQF8cOqBYBovYTr0FwqBxuW6rOlEimnSHEWsX0Fvj4EJSU882%2B767Y%2FuoudNR19Jp8pgq796BJnXv%2BUlA%3D%3D&numOfRows=1&item_name=" . urlencode($_GET["search"])); 
    curl_setopt($ch, CURLOPT_HEADER, 0); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20041107 Firefox/1.0'); 
    $response = curl_exec($ch); 
    curl_close($ch);
    $object = simplexml_load_string($response, null, LIBXML_NOCDATA);
    if($object->body->totalCount > 0) {
        echo "<h1>" . $object->body->items->item->ITEM_NAME . "</h1><br>";
        echo "<h2>효능효과</h2><br>";
        $e = $object->body->items->item->EE_DOC_DATA->DOC->SECTION;
        if($e) {
            for($i = 0; $i < 10; $i = $i+1) {
                if(!$e->ARTICLE[$i]) break;
                if($e->ARTICLE[$i]['title']) echo "<h3>" . $e->ARTICLE[$i]['title'] . "</h3><br>";
                $ee = $e->ARTICLE[$i];
                for($j = 0; $j < 10; $j = $j+1) {
                    if(!$ee->PARAGRAPH[$j]) break;
                    echo $ee->PARAGRAPH[$j] . "<br>";
                    echo "<br>";
                }
                echo "<br>";
            }
        }
        echo "<h2>용법용량</h2><br>";
        $e = $object->body->items->item->UD_DOC_DATA->DOC->SECTION;
        if($e) {
            for($i = 0; $i < 10; $i = $i+1) {
                if(!$e->ARTICLE[$i]) break;
                if($e->ARTICLE[$i]['title']) echo "<h3>" . $e->ARTICLE[$i]['title'] . "</h3><br>";
                $ee = $e->ARTICLE[$i];
                for($j = 0; $j < 10; $j = $j+1) {
                    if(!$ee->PARAGRAPH[$j]) break;
                    echo $ee->PARAGRAPH[$j] . "<br>";
                    echo "<br>";
                }
                echo "<br>";
            }
        }
        echo "<h2>사용상의주의사항</h2><br>";
        $e = $object->body->items->item->NB_DOC_DATA->DOC->SECTION;
        if($e) {
            for($i = 0; $i < 10; $i = $i+1) {
                if(!$e->ARTICLE[$i]) break;
                if($e->ARTICLE[$i]['title']) echo "<h3>" . $e->ARTICLE[$i]['title'] . "</h3><br>";
                $ee = $e->ARTICLE[$i];
                for($j = 0; $j < 10; $j = $j+1) {
                    if(!$ee->PARAGRAPH[$j]) break;
                    echo $ee->PARAGRAPH[$j] . "<br>";
                    echo "<br>";
                }
                echo "<br>";
            }
        }
    }
?>
