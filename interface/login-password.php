<?php
header('content-type:application/json;charset=utf-8');
$userName = $_REQUEST['userName'];
$userPassword = $_REQUEST['userPassword'];
$backHref = $_REQUEST['backHref'];
include('./conn.php');
$str = "select userId,userName,userPassword,userPhoto from tmallusers where userName='$userName' and userPassword='$userPassword'";
// echo $str;
$selected = $conn->query($str);
// var_dump($selected);
$result = array();
if($selected->num_rows > 0){
  // echo '111';
  $row = $selected->fetch_assoc();
  // var_dump($row);
  $result['logined'] = true;
  $result['loginInfo'] = $row;
//  echo "<script>alert('登陆成功');</script>";
//  echo "<script>document.cookie='userInfo=$row'</script>";
//  echo "<script>location.href ='$backHref' </script>";
//  echo "<script>location.href = document.referrer</script>";
echo json_encode($result);
die();

}else{
  $result['logined'] = false;
  $result['loginInfo'] = '登录用户名或密码错误,请重新登录';
//  echo "<script>alert('用户名或密码错误')</script>";
//  echo "<script>location.href = '../src/login.html' </script>";
echo json_encode($result);

}

?>