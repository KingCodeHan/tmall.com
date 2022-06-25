<?php
header('content-type:text/html;charset=utf-8');
$userName = $_REQUEST['userName'];
$userPassword = $_REQUEST['userPassword'];
include('./conn.php');
$str = "select * from tmallusers where userName='$userName' and userPhone=$userPassword";
// echo $str;
$selected = $conn->query($str);
// var_dump($selected);
if($selected->num_rows > 0){
  echo "<script>alert('登陆成功')</script>";
  echo "<script>location.href=document.referrer</script>";
}else{
  echo "<script>alert('用户名或密码错误，请重新登录')</script>";
  echo "<script>location.href='../src/login.html'</script>";
}

?>