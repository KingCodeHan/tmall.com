<?php
header('content-type:application/json;charset=utf-8');
$userName = $_REQUEST['user-name'];
$userPassword = $_REQUEST['user-password'];
$userPhone = $_REQUEST['reg-phone-number-input'];
$userEmail = $_REQUEST['user-email'];
$userPhoto = $_REQUEST['user-photo'];
$userAddress = $_REQUEST['user-address'];
$userPhoto = './img/'.$userPhoto;
// $userName = 'wangzihan';
// $idList = '100001,100003';
include('./conn.php');
$str = "select * from tmallusers where userName='$userName' or userPhone=$userPhone";
echo $str;
$selected = $conn->query($str);
var_dump($selected);
if($selected->num_rows > 0){
  echo "<script>alert('用户名或手机号已存在，请重新填写注册信息')</script>";
  echo "<script>location.href='../src/register.html'</script>";
}else{
  $str1 = "insert into `tmallusers` ( `userName`, `userPassword`, `userPhone`, `userPhoto`, `userAddress`, `userEmail`) VALUES ('$userName', '$userPassword', '$userPhone', '$userPhoto', '$userAddress', '$userEmail')";
  echo $str1;
  $selected = $conn->query($str1);
  var_dump($selected);
  if($selected){
    echo "<script>alert('注册成功，请登录')</script>";
    echo "<script>location.href='../src/login.html'</script>";
  }else{
    echo "注册失败";
    echo "<script>location.href='../src/register.html'</script>";
  }
}
?>