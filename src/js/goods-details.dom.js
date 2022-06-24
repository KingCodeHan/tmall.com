import $ from './jquery-esm.js';
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
// console.log(datasObj);
// let jsonDatas = JSON.stringify(datasObj);
document.cookie = `goods=maoyi`;
updataCookies('carGoods',datasObj);
// console.log(JSON.parse(getCookies('carGoods')));
// console.log(getCookies('carGoods'));

// if(datasObj.prop.length!==0){
//   // let arr1 =
//   // console.log(arr1);
//   // if(!document.cookie.split('; ').map(elm => elm.split('=')).filter(el => el[0] === 'carGoods')){
//   //   let arr3 = []
//   //   document.cookie = `carGoods=${jsonDatas}`;
//   // }
  
// }

location.href = './shopping-car.html';
});

