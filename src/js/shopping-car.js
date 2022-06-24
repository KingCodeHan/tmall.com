import $ from './jquery-esm.js';

function getCookies(key){
  if(document.cookie.split('; ').map(elm => elm.split('=')).filter(el => el[0] === key)[0]){
    return document.cookie.split('; ').map(elm => elm.split('=')).filter(el => el[0] === key)[0][1];
  }else{
    return ;
  }
}

if(getCookies('carGoods')){
  let datas = JSON.parse(getCookies('carGoods'));
  // console.log(datas);
  if(datas.length) {
    let idList = datas.map(el => el.id).join(',');
    // console.log(str);
    $.ajax({
      type: 'get',
      data: {idList},
      url: '../interface/shopping-car.php',
      dataType: 'json',
    }).then((res) => {
      // console.log(res);
     
      let templ = '';
      res.forEach(el => {
        const picture = JSON.parse(el.picture);
        let index = datas.findIndex(elm => elm.id === el.id);
        let temp2 = '';
        datas[index].prop.forEach(item => {
          if(item.type === 'text'){
            temp2 += `
            <p>${item.propName}：<span>${item.propSize}</span></p>
            `;
          }else if(item.type === 'img'){
            temp2 += `
              <p>${item.propName}：<img src="${item.propSize}" /></p>
            `;
          }
        });
        templ += `   <div class="goods-groups">
        <div class="goods-groups-header">
          <input type="checkbox" name="group-chk" id="group-chk" class="group-chk">
          <img src="./img/10129.png" alt="天猫国际" title="天猫国际">
          <span>店铺：</span>
          <a href="javascript:;" class="store-name">${el.storeName}</a>
          <a href="javascript:;" class="ww-line"></a>
          <div class="discount-coupon">
           <a href="javascript:;">
            <span>优惠券</span>
            <i class="iconfont icon-xiajiantou"></i>
           </a>
            <div class="discount-coupon-list"  style="display:none;">
                <div class="close"><i class="iconfont icon-cuocha_kuai"></i></div>
                <p class="discount-coupon-list-title">
                  <i class="iconfont icon-xiaoxi"></i>
                  已领取<span>0</span>张优惠券，有新优惠券可领取
                </p>
                <ul class="discount-coupon-listbox">
                  <li class="discount-coupon-items">
                    <div>￥<span>20</span></div>
                    <div>
                      <p class="discount-coupon-items-info">6月 1599-20 满1599减20</p>
                      <p class="discount-coupon-items-time">2022.06.01 00:00-2022.06.30 23:59</p>
                    </div>
                    <div class="discount-coupon-items-btn">领取</div>
                  </li>
                  <li class="discount-coupon-items">
                    <div>￥<span>20</span></div>
                    <div>
                      <p class="discount-coupon-items-info">6月 1599-20 满1599减20</p>
                      <p class="discount-coupon-items-time">2022.06.01 00:00-2022.06.30 23:59</p>
                    </div>
                    <div class="discount-coupon-items-btn">领取</div>
                  </li>
                  <li class="discount-coupon-items">
                    <div>￥<span>20</span></div>
                    <div>
                      <p class="discount-coupon-items-info">6月 1599-20 满1599减20</p>
                      <p class="discount-coupon-items-time">2022.06.01 00:00-2022.06.30 23:59</p>
                    </div>
                    <div class="discount-coupon-items-btn">领取</div>
                  </li>
                </ul>
            </div>
          </div>
        </div>
        <div class="goods-groups-content">
          <div class="goods-groups-welfare">
            <img src="../src/img/10132.png" alt="跨店满减" title="跨店满减">
            <span>每满300减50，可跨店</span>
          </div>
          <ul class="goods-groups-commodity-list">

            <li class="goods-groups-commodity-items" data-id=${el.id}>
              <div class="commodity-items-chk-box">
                <input type="checkbox" name="commodity-items-chk" class="commodity-items-chk">
              </div>
              <div class="commodity-items-info-box">
                <div class="commodity-items-info-left">
                  <a href="javascript:;">
                    <img src="${picture[0].url}" alt="${picture[0].alt}" title="${picture[0].alt}">
                  </a>
                  <div class="showbox">
                    <a href="javascript:;">
                      <img src="${picture[0].url}" alt="${picture[0].alt}">
                    </a>
                  </div>
                </div>
                <div class="commodity-items-info-right">
                    <div class="commodity-items-info-title">
                      <a href="javascript:;">${el.title}</a>
                    </div> 
                    <div class="commodity-items-promo-logos"></div>
                    <div class="commodity-items-icon-list">
                      <a href="javascript:;" title="支持信用卡支付"></a>
                      <a href="javascript:;" title="消费者保障服务，卖家承诺7天退换"></a>
                      <a href="javascript:;" title="消费者保障服务，卖家承诺如实描述"></a>
                    </div>                       
                </div>
              </div>
              <div class="commodity-items-update-kind">
                ${temp2}
                <i></i>
                <span>修改</span>
              </div>
              <div class="commodity-items-total">
                <div class="del-price">￥${parseFloat(el.price).toFixed(2)}</div>
                <span class="items-total">￥${parseFloat(el.discountPrice).toFixed(2)}</span>
              </div>
              <div class="commodity-items-num">
                <div class="items-num-minus">-</div>
                <input type="text" value="${datas[index].num}" class="items-nums">
                <div class="items-num-plus">+</div>
              </div>
              <div class="commodity-items-price">
                <span class="commodity-price">￥${(datas[index].num * el.discountPrice).toFixed(2)}</span>
              </div>
              <div class="commodity-items-setting">
                <a href="javascript:;" class="commodity-move-favorite">移入收藏夹</a>
                <a href="javascript:;" class="del-commodity-items">删除</a>
              </div>
            </li>
          </ul>
        </div>
      </div>`;
      });
      // console.log(templ);
      $('.car-goods-content').html(templ);

      function getSum(el){
        let price =$(el).parents('.goods-groups-commodity-items').find('.items-total').text().slice(1);
        let num = $(el).parents('.goods-groups-commodity-items').find('.items-nums').val();
        let sumPriceStr = '￥' + (price * num).toFixed(2);
        $(el).parents('.goods-groups-commodity-items').find('.commodity-price').text(sumPriceStr);
      }

      function updataCookiesNum(el){
        const newDatas = datas.map(elm => {
          if(elm.id === $(this).parents('.goods-groups-commodity-items').prop('data-id')){
           return elm.num = parseInt($(this).parents('.goods-groups-commodity-items').find('.items-nums').val());
          }
        })
        let jsonDatas = JSON.stringify(newDatas);
        document.cookie = `carGoods=${jsonDatas}`;
      }

      function deleteCookie(el){
        datas = datas.filter(elm => {
          // console.log(elm.id);
          // console.log($(el).parents('.goods-groups-commodity-items').prop('data-id'));
          return elm.id != $(el).parents('.goods-groups-commodity-items').attr('data-id');
          // if(elm.id !== $(this).parents('.goods-groups-commodity-items').prop('data-id')){
          //   elm.num = parseInt($(this).parents('.goods-groups-commodity-items').find('.items-nums').val());
          // }
        });
        let jsonDatas = JSON.stringify(datas);
        document.cookie = `carGoods=${jsonDatas}`;
      }
      $('.items-num-minus').on('click',function(){
        let num = parseInt($(this).siblings('input').val());
        if(num <= 1) return;
        $(this).siblings('input').val(--num)
        getSum(this);
        getTotal();
        updataCookiesNum(this);
      });

      $('.items-num-plus').on('click',function(){
        let num = parseInt($(this).siblings('input').val());
        $(this).siblings('input').val(++num);
        getSum(this);
        getTotal();
        updataCookiesNum(this);
      });
      // console.log($('.items-nums'));
      $('.items-nums').on('keyup',function(){
        $(this).val($(this).val().replace(/\D/g,''));
       getSum(this);
       getTotal();
       updataCookiesNum(this);
      });

      $('.items-nums').on('blur',function(){
        if($(this).val() === '' || $(this).val() == 0){
          $(this).val(1);
        }
        getSum(this);
        getTotal();
        updataCookiesNum(this);
      });

      // 每个商品选择操作
      $('.commodity-items-chk').on('change',function(){
        // console.log(1);
        // console.log($(this).parents('.goods-groups-commodity-list').find('.goods-groups-commodity-items').length);
        let elLen = $(this).parents('.goods-groups-commodity-list').find('.goods-groups-commodity-items').length;
        let ckLen = $(this).parents('.goods-groups-commodity-list').find('.commodity-items-chk:checked').length;
        $(this).parents('.goods-groups').find('.group-chk').prop('checked',elLen===ckLen);
        let grElLen = $(this).parents('.car-goods-content').find('.goods-groups').length;
        let grCkLen = $(this).parents('.car-goods-content').find('.group-chk:checked').length;
        console.log(grElLen);
        console.log(grCkLen);
       
        $('#checkAllHeader,#checkAllFooter').prop('checked',grElLen===grCkLen);
        getTotal();
      })


      // 店铺商品全选操作
      $('.group-chk').on('change',function(){
        $(this).parents('.goods-groups').find('.commodity-items-chk').prop('checked',$(this).prop('checked'));
        $('.commodity-items-chk').trigger('change',$(this));

      })
      function getTotal(){
        let num = 0;
        let sum = 0;
        $('.commodity-items-chk:checked').each((i,el)=>{
         num += parseInt($(el).parent().siblings('.commodity-items-num').find('.items-nums').val());
         sum += parseFloat( $(el).parent().siblings('.commodity-items-price').find('.commodity-price').text().slice(1));
        });
        sum = '￥' + sum.toFixed(2);
        $('.all-total-price').text(sum);
        $('.chk-num-sum').text(num);
      }

      // 全选操作
      $('#checkAllHeader,#checkAllFooter').on('change',function(){
        // console.log($(this).prop('checked'));
        // $(this).parents('.car-goods-content').find('.commodity-items-chk').prop('checked',$(this).prop('checked'));
        $('.car-goods-content').find('.commodity-items-chk').prop('checked',$(this).prop('checked'));
        // console.log($(this).parents('.car-goods-content').find('.commodity-items-chk'));
        $('.commodity-items-chk').trigger('change',$(this));
        // getTotal();

      })

      // 计算选择商品的总价

      // 删除商品
      $('.del-commodity-items').on('click',function(){
        console.log(11);
        deleteCookie(this);
        location.reload();
      });

      // 删除选中商品
      $('.del-chk-goods').on('click',function(){
        $('.commodity-items-chk:checked').each((i,item) => {
          deleteCookie(item);
        });
        location.reload();
      });
      
    }).catch(xhr => xhr.status);
  }else{
    $('.shopping-car-empty').css("display","block");
    $('.shopping-car-goods').css("display","none");
  }
}