<?php
header('content-type:application/json;charset=utf-8');
$userName = $_REQUEST['userName'];
// $userName = 'wangzihan';
// $idList = '100001,100003';
include('./conn.php');
$str = "select * from tmallusers where userName='$userName'";

$selected = $conn->query($str);
// var_dump($selected);
if($selected->num_rows){
  echo '{"message":"用户名已存在","hasUser":true}';
}else{
  echo '{"message":"用户名可用","hasUser":false}';
}
?>