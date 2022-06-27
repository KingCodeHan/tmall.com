import $ from './jquery-esm.js';
import cookie from './cookie.js';

function verReg(){
  let flag = false;
function btnDis(){
  let showFlag = $('.reg-phone-number-input').val() === '' || $('.reg-verification-code-input').val() === '';
   
    if(!showFlag){
      $('.reg-btn').prop('disabled',showFlag).addClass('reg-btn-active');
    }else{
      $('.reg-btn').prop('disabled',showFlag).removeClass('reg-btn-active');
    }
}

$('.reg-phone-number-input').on('input',function(){
  btnDis();
})
$('.reg-verification-code-input').on('input',function(){
  btnDis();
})

// 手机号验证
let phoneFlag = false;
$('.reg-phone-number-input').on('input',function(){
  let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if($(this).val() === ''){
    $('.err-phone-message').css('display','none');
    flag = false;
  }else {
    if(!reg.test($('.reg-phone-number-input').val())){
      $('.err-phone-message').css('display','block').find('span').text('手机号格式不正确');
      flag = false;
    }else{
      let userPhone = $(this).val();
      $.ajax({
        type:'get',
        data: {userPhone},
        url: '../interface/hasPhone.php',
        dataType:'json',
      }).then( res => {
        if(res.hasPhone){
          $('.err-phone-message').css('display','block').find('span').text(res.message);
          flag = false;
          phoneFlag = false;
        }else{
          $('.err-phone-message').css('display','none');
          phoneFlag = true;
        }
      }).catch(err => {
        console.log(err);
      })

     
    }
  }
})

// 发送验证码
let verFlag = true;
$('.send-verification').on('click',function(){
 
  if(verFlag){
    verFlag = false;
    let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if(phoneFlag) {
    cookie.set('reg-agreement',123456,1);
    cookie.set('reg-phone',$('.reg-phone-number-input').val(),1);

    let i = 9;
    // 
    // $(this).attr('disabled',true);
    $(this).addClass('send-verification-active').text(`重发验证（ ${i} s）`);
    // console.log(111);
    let timer = setInterval(() => {
      i--;
      if(i < 1){
        $(this).text(`重发`).removeClass('send-verification-active').attr('disabled',false);
        verFlag = true;
        cookie.set('reg-agreement','',-1);
        cookie.set('reg-phone','',-1);
        clearInterval(timer);
      }else{
        $(this).text(`重发验证（ ${i} s）`);
      }
    },1000);
  }
 
  }

});

$('.reg-btn').on('click',function(){
  if(!$('#reg-agreement-checkbox').prop('checked')){
    alert('请阅读并同意协议');
  }else{
    if($('.reg-phone-number-input').val() !== cookie.get('reg-phone')){
      alert('手机号更改，请重新获取验证码');
    }else {
      if($('.reg-verification-code-input').val() !== cookie.get('reg-agreement')){
        $('.err-verification-message').css('display','block').find('span').text('验证码错误');
  
      }else{
        $('#alertBox').css('display','block');
        $('.err-verification-message').css('display','none');
          let width = window.outerWidth+'px';
          let height = window.outerHeight+'px';
          $('#alertBox').css({
            'display':'block',
            'width': width,
            'height': height,
          });
          $('html').css('overflow','hidden');
      }
    }
  }
 
//   


});



// 用户名正则验证格式
$('.user-name').on('input',function(){
  let reg = /^[a-zA-Z0-9_-]{4,16}$/;
  let len = $(this).val().length;
 if($(this).val() === ''){
  $(this).siblings('span').removeClass('span-active').css('display','inline-block').find('em').text('4~16位（字母数字下划线减号）');
  flag = false;
 }else {
  if(len < 4 || len > 16){
    $(this).siblings('span').addClass('span-active').css('display','inline-block').find('em').text('用户名长度4~16位');
    flag = false;
  }else if(!reg.test($(this).val())){
    $(this).siblings('span').addClass('span-active').css('display','inline-block').find('em').text('请仅用字母数字下划线设置用户名');
    flag = false;
  }else{
    let userName = $(this).val();
    $.ajax({
      type:'get',
      data: {userName},
      url: '../interface/hasUser.php',
      dataType:'json',
    }).then( res => {
      if(res.hasUser){
        $(this).siblings('span').addClass('span-active').css('display','inline-block').find('em').text(res.message);
        flag = false;
      }else{
        $(this).siblings('span').removeClass('span-active').css('display','inline-block').find('em').text(res.message);
        flag = true;
      }
    }).catch(err => {
      console.log(err);
    })
    
  }
 }
})

// 设置密码
$('.user-password').on('input',function(){
  let len = $(this).val().length;
  let reg = /^[a-zA-Z0-9_]{6,25}$/;
  if($(this).val() === ''){
    $(this).siblings('span').removeClass('span-active').find('em').text('请设置6-25位字符的密码');
    flag = false;
  }else{
    if(len < 6 || len > 25){
      $(this).siblings('span').addClass('span-active').find('em').text('密码长度6~25位');
      flag = false;
    }else{
      if(!reg.test($(this).val())){
        $(this).siblings('span').addClass('span-active').find('em').text('请以字母数字下划线设置密码');
        flag = false;
        }else{
        $(this).siblings('span').removeClass('span-active').find('em').text('密码格式正确');
        flag = true;
        }
    }
  }
})

// 确认密码
$('.confirm-password').on('input',function(){
  if($(this).val() === '' ){
    $(this).siblings('span').removeClass('span-active').find('em').text('');
    flag = false;
  }else{
    if($(this).val() !== $('.user-password').val()){
    $(this).siblings('span').addClass('span-active').find('em').text('密码不一致');
    flag = false;
    }else {
    $(this).siblings('span').removeClass('span-active').find('em').text('密码一致');
    flag = true;
    }
  }
});

// 验证邮箱
$('.user-email').on('input',function(){
  let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if($(this).val() === ''){
    $(this).siblings('span').removeClass('span-active').find('em').text('');
  }else{
    if(!reg.test($(this).val())){
    $(this).siblings('span').addClass('span-active').find('em').text('邮箱格式不正确');
    flag = false;
    }else{
    $(this).siblings('span').removeClass('span-active').find('em').text('邮箱格式正确');
    flag = true;
  }
  }
});

$('#user-info-submit').on('click',function(ev){
  if(!flag || $('.user-email').val === '' || $('.user-name').val() === '' || $('.user-password').val() === '' || $('confirm-password').val() === ''){
    ev.preventDefault();
    alert('1请完整填写注册信息');
  }
})
}

verReg();