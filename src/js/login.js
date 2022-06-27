import $ from './jquery-esm.js';
import cookie from './cookie.js';


function tabs(el,className){
  $(el).find('>.tabs-list>.tabs-list-items').on('click',function(){
    // console.log(this);
    let index = Array.from($(el).find('>.tabs-list>.tabs-list-items')).findIndex(elm => elm === this);
    // console.log(index);
    $(this).addClass(className).siblings().removeClass(className);
    $(el).find('>.tabs-con>.tabs-items').eq(index).css("display","block").siblings().css('display',"none");
    
  })
}
// 切换登录方式
tabs('.input-login','active');
tabs('.login-box','login-method-active');

// 密码登录验证
$('.password-login').on('click',function(ev){
  ev.preventDefault();
  let userName = $('#user-name').val();
  let userPassword = $('.user-password').val();
  let backHref = location.href;
  console.log(111);

  if( userName !== '' && userPassword !== ''){
    $.ajax({
      type:'get',
      url: '../interface/login-password.php',
      data:{
        userName,
        userPassword,
        backHref,
      },
    }).then(res => {
      // alert(res)
      const result = JSON.parse(res);
      if(result.logined){
        cookie.set('loginInfo',JSON.stringify(result.loginInfo),5);
        $('html').append('<script>location.href = document.referrer</script>');
      }else{
        alert(result.loginInfo);
      }
    //  $('body').append(res);
    }).catch(err => {
      console.log(err.status);
    });
  }
})