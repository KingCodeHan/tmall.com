<?php
header('content-type:application/json;charset=utf-8');
$userPhone = $_REQUEST['userPhone'];
// $userName = 'wangzihan';
// $idList = '100001,100003';
include('./conn.php');
$str = "select * from tmallusers where userPhone='$userPhone'";

$selected = $conn->query($str);
// var_dump($selected);
if($selected->num_rows){
  echo '{"message":"手机号已存在","hasPhone":true}';
}else{
  echo '{"message":"手机号可用","hasPhone":false}';
}
?>