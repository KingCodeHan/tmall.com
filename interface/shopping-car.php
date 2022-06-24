<?php
header('content-type:application/json;charset=utf-8');
$idList = $_REQUEST['idList'];
// $idList = '100001,100003';
include('./conn.php');
$str = "select * from product where id in ($idList)";
// echo $str;
$selected = $conn->query($str);
$arr = [];
while($row = $selected->fetch_assoc()){
  array_push($arr,$row);
}
$json = json_encode($arr);
echo $json;
?>