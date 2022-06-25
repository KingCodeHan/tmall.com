import $ from './jquery-esm.js';


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
$('.password-login').on('click',function(){
  let userName = $('#user-name').val();
  let userPassword = $('.user-password-box').val();
  if( userName !== '' && userPassword !== ''){
    $.ajax({
      type:'get',
      url: '../interface/login.php',
      data:{
        userName,
        userPassword,
      },
      dataType: 'json',
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err.status);
    });
  }
})