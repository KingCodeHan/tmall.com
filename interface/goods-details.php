<?php
    header('content-type:application/json;charset=utf-8');
    $id = $_REQUEST['id'];
    include('./conn.php');
    $str = "select * from product where id = ${id}";
    $selected = $conn->query($str);
    $row = $selected->fetch_assoc();
    $json = json_encode($row);
    echo $json;
?>