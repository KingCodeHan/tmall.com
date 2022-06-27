import $ from './jquery-esm.js';
import Swiper from '../../swiper-7.4.1/swiper/swiper-bundle.esm.browser.min.js';
    // 加入购物车

    // 类型选择
$('.tb-skin').on('click','li',function(){
  $(this).toggleClass('skin-active').siblings().removeClass('skin-active');
  // console.log($(this));
});
// console.log('aaa');
// console.log($('.tb-skin'));

// 数量选择
$('.mui-amount-increase').on('click',function(){
  let num = parseInt($('.selectNum').val());
  $('.selectNum').val(++num);
});
$('.mui-amount-decrease').on('click',function(){
  
  let num = parseInt($('.selectNum').val());
  if(num <= 1) return;
  $('.selectNum').val(--num);
});
$('.selectNum').on('keyup',function(ev){

$(this).val($(this).val().replace(/\D/g,''));
})
$('.selectNum').on('blur',function(){
  if($(this).val() === ''){
    $(this).val('1');
  }
})
// 获取cookie
function getCookies(key){
  if(document.cookie.split('; ').map(elm => elm.split('=')).filter(el => el[0] === key)[0]){
    return document.cookie.split('; ').map(elm => elm.split('=')).filter(el => el[0] === key)[0][1];
  }else{
    return ;
  }
}
function updataCookies(key,value){
  if(getCookies(key)){
    let cookieData = JSON.parse(getCookies(key));
    let index = cookieData.findIndex(el => el.id == value.id);
    // console.log(cookieData);
    // console.log(index);
   if(index === -1 ){
    cookieData.push(value);
    document.cookie = `${key}=${JSON.stringify(cookieData)}`;
   }else{
    let oldNum = cookieData[index].num;
    let addNum = value.num;
    cookieData[index].num = oldNum + addNum;
    document.cookie = `${key}=${JSON.stringify(cookieData)}`;
   }
    
  }else{
    const arr = [];
    arr.push(value)
    document.cookie = `${key}=${JSON.stringify(arr)}`;
  }
}
// 添加cookies
$('.tb-btn-basket').on('click',function(){
  const datasObj = {};
  const arr = Array.from($('.tb-skin .skin-active>:nth-child(1)').map((i,elm)=>{
    let obj = {};
    let key = $(elm).parents('dd').siblings('dt').text();
    obj.propName = key;
    // console.log(key);
    if(elm.nodeName === 'SPAN'){
      obj.propSize = $(elm).text();
      obj.type = 'text';
    }else if(elm.nodeName === 'IMG') {
      obj.propSize = $(elm).attr('src');
      obj.type = 'img';
    }
    return obj;
  }));
datasObj.prop = arr;
datasObj.num = parseInt($('.selectNum').val());
datasObj.id = location.search.split('&')[0].split('=')[1];
document.cookie = `goods=maoyi`;
updataCookies('carGoods',datasObj);
location.href = './shopping-car.html';
});

// 商品种类滑过切换图片
$('.tb-thumb-content').on('mouseover','.swiper-slide',function(){
  let src = $(this).children('img').prop('src');
  $('.smallImgBox img').prop('src',src);
  $('.bigImgBox img').prop('src',src);
});

// 商品放大镜

$('.ks-imagezoom-wrap').on('mouseover',function(){
  $('.glass').css('display','block');
 $('.bigImgBox').css('display','block');
})
let maxOffsetX = $('.ks-imagezoom-wrap').width() - $('.glass').width();
let maxOffsetY = $('.ks-imagezoom-wrap').height() - $('.glass').height();
let bigImgOffsetX = $('.bigImgBox img').width() - $('.bigImgBox').width();
let bigImgOffsetY = $('.bigImgBox img').height() - $('.bigImgBox').height();
$('.ks-imagezoom-wrap').on('mousemove',function(ev){
  let left = ev.pageX - this.offsetLeft - 50;
  let top= ev.pageY - this.offsetTop - 50;
  if(left < 0){
    left = 0;
  }else if(left > maxOffsetX){
    left = maxOffsetX;
  }
  if(top < 0){
    top = 0;
  }else if(top > maxOffsetY){
    top = maxOffsetY;
  }

  let bigImgLeft = left / maxOffsetX * bigImgOffsetX;
  let bigImgTop = top / maxOffsetY * bigImgOffsetY;
  $('.bigImgBox img').css({
    'left': -bigImgLeft,
    'top': -bigImgTop,
  });
   $('.glass').css({
     'left': left,
     'top': top,
   });
});

$('.ks-imagezoom-wrap').on('mouseleave',function(){
  $('.glass').css('display','none');
  $('.bigImgBox').css('display','none');
});
