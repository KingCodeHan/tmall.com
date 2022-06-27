import $ from "./jquery-esm.js";
import Swiper from '../../swiper-7.4.1/swiper/swiper-bundle.esm.browser.min.js';
import cookie from './cookie.js';

if(cookie.get('loginInfo')){
  const loginInfo = JSON.parse(cookie.get('loginInfo'));
  $('.hello-tmall').text(`${loginInfo.userName},欢迎来到天猫`);
  $('.login-place a').prop('href',`./user-info.html?userId=${loginInfo.userId}`).text(loginInfo.userName);
  $('.header-right-shopping-car a').prop('href',`./shopping-car.html?userId=${loginInfo.userId}`);
}
let id = location.search.split("=")[1];
// let dateNow = Date.now();
$.ajax({
  url: "../interface/goods-details.php", // 请求路径
  type: "get", // 请求类型
  data: { id }, // 需要发送的数据
  dataType: "json", // 后端发送给前端的数据类型
})
  .then((res) => {
    // console.log(res);
    $(".store-name strong,.shop-intro-name>a>b").text(res.storeName);
    $(".tb-detail-hd").html(`<h1>${res.title}<h1>`);
    $(".tm-promo-price span").text(parseFloat(res.discountPrice).toFixed(2));
    $(".goods-price-init").text(parseFloat(res.price).toFixed(2));

    const storeScore = JSON.parse(res.storeScore);
    $(".store-score-box").html(`
                <div>
                  <div>描述</div>
                  <div>
                    <span>${storeScore.describe[0]}</span>
                    <i class="iconfont icon-a-xiajiantouzhixiangxiajiantou ${storeScore.describe[1]}"></i>
                  </div>
                </div>
                <div>
                  <div>服务</div>
                  <div>
                    <span>${storeScore.server[0]}</span>
                    <i class="iconfont icon-a-xiajiantouzhixiangxiajiantou ${storeScore.server[1]}"></i>
                  </div>
                </div>
                <div>
                  <div>物流</div>
                  <div>
                    <span>${storeScore.logistics[0]}</span>
                    <i class="iconfont icon-a-xiajiantouzhixiangxiajiantou ${storeScore.logistics[1]}"></i>
                  </div>
                </div>
    `);
    $(".salesMonth").text(res.salesMonth);
    const tmSaleProp = JSON.parse(res.tmSaleProp);
    let templ2 = "";
    // console.log(tmSaleProp);
    tmSaleProp.forEach((elm) => {
      if (elm.propType === "text") {
        let templ3 = "";
        elm.propSize.forEach((el) => {
          templ3 += `
              <li>
                <span>${el}</span>
              </li>
          `;
        });
        // console.log(templ3);
        templ2 += `
        <dl class="tm-sale-prop">
                <dt>${elm.propName}</dt>
                <dd>
                  <ul>
                    ${templ3}
                  </ul>
                </dd>
              </dl>
   `;
      } else if (elm.propType === "img") {
        let templ3 = "";
        elm.propSize.forEach((el) => {
          templ3 += `
              <li>
              <img src="${el.url}" alt="${el.alt}">
              </li>
          `;
        });
        // console.log(templ3);
        templ2 += `
        <dl class="tm-sale-prop">
                <dt>${elm.propName}</dt>
                <dd>
                  <ul>
                    ${templ3}
                  </ul>
                </dd>
              </dl>
   `;
      }
    });
    $(".tb-skin").html(templ2);

    const picture = JSON.parse(res.picture);
    let templ4 = "";
    // let templ4Len = 0;
    picture.forEach((elm) => {
      // templ4Len++;
      templ4 += `
      <li class="swiper-slide">
      <img src="${elm.url}" alt="${elm.alt}">
    </li>
      `;
    });
    $(".tb-thumb").html(templ4);

    // 商品展示切换
    let swiper = new Swiper(".tb-thumb-content", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 10,
    });

    // $('.ks-imagezoom-wrap').html(`
    //   <a href="javascript:;">
    //   <img src="${picture[0].url}" alt="${picture[0].alt}">
    //   </a>
    // `);

    $(".attributes-list-name>span").text(
      JSON.parse(res.details).text.brandName
    );
    let templ5 = "";
    let templ6 = "";

    JSON.parse(res.details).text.parameter.forEach((el) => {
      templ5 += `
    <li>${el}</li>
    `;
    });

    JSON.parse(res.details).pictures.forEach((el) => {
      templ6 += `
   <img src="${el}">
   `;
    });
    $(".details-img-box").html(templ6);
    $(".i_attrul").html(templ5);

    $(".inventory").text(res.inventory);
  })
  .catch((err) => {
    console.log(err.status);
  });
