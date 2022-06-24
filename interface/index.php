<?php
    header('content-type:application/json;charset=utf-8');
    // $id = 100001;
    include('./conn.php');
    $str = "select `id`,`picture`,`title`,`price` from product order by id";
    $selected = $conn->query($str);
    $arr = [];
    while($row = $selected->fetch_assoc()){
      array_push($arr,$row);
    }
    $json = json_encode($arr);
    echo $json;
?>