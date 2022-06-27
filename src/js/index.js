import $ from './jquery-esm.js';
import {Swiper} from '../../swiper-7.4.1/swiper/swiper-bundle.esm.browser.min.js';
import cookie from './cookie.js';
if(cookie.get('loginInfo')){
  const loginInfo = JSON.parse(cookie.get('loginInfo'));
  console.log(loginInfo);
  $('.hello-tmall').text(`${loginInfo.userName},欢迎来到天猫`);
  $('.login-place a').prop('href',`./user-info.html?userId=${loginInfo.userId}`).text(loginInfo.userName);
  $('.header-right-shopping-car a').prop('href',`./shopping-car.html?userId=${loginInfo.userId}`);
  $('.userInfo-login').prop('href',`./user-info.html?userId=${loginInfo.userId}`).children('img').prop('src',loginInfo.userPhoto).siblings('span').text(`hi! ${loginInfo.userName}`);
}
$.ajax({
  url:'../interface/index.php', // 请求路径
  type:'get', // 请求类型
  // data:{id}, // 需要发送的数据
  dataType:'json', // 后端发送给前端的数据类型
}).then((res) => {
  console.log(res);
  let templ1 = '';
  res.forEach(el => {
    const picture = JSON.parse(el.picture);
    templ1 += `
    <li class="goods-items">
    <a href="./goods-details.html?id=${el.id}">
      <div class="imgbox">
        <img src="${picture[0].url}" alt="${picture[0].alt}">
      </div>
      <p class="singline goods-item-title">${el.title}</p>
      <p class="goods-price">￥${parseFloat(el.price).toFixed(2)}</p>
    </a>
  </li>
    `;
  });
  $('.content-goods-list1 .goods-list-content').html(templ1);
}).catch(err => {
  console.log(err.status);
});

     var mySwiper = new Swiper ('.shuffling1', {
    //   direction: 'vertical', // 垂直切换选项
      loop: true, // 循环模式选项

    //   // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      centeredSlides: true, //居中幻灯片。设定为true时，当前的active slide 会居中，而不是默认状态下的居左。
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      //可选选项，自动滑动

    });

    var mySwiper1 = new Swiper('.shuffling2', {
      init: false,
      loop: true, // 循环模式选项


      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
      },

      slidesPerView: 2,
      slidesPerGroup: 2,  //在carousel mode下定义slides的数量多少为一组。
      spaceBetween: 20,

      autoplay: true,//可选选项，自动滑动
    });
    setTimeout(function () {
      mySwiper1.init(); //现在才初始化
    }, 1000);