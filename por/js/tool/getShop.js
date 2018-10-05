function getShop(index, size, shopName, shopCategoryId, num) {
    // console.log(num);
    let para;
    if (shopName === null && shopCategoryId === null){
        para = 'pageIndex='+ index +'&pageSize='+ size;
    } else if (shopName === null && shopCategoryId !== null){
        para = 'shopCategoryId='+ shopCategoryId +'&pageIndex='+ index +'&pageSize=' + size;
    } else if (shopName !== null && shopCategoryId === null){
        para = 'shopName='+ shopName +'&pageIndex='+ index +'&pageSize=' + size;
    }
    /*console.log(index);
    console.log(size);
    console.log(shopName);
    console.log(para);*/
    $.ajax({
        type: 'get',
        url: URL + '/shop?' + para,
        success: function (xhr) {
            // console.log(xhr);
            if (xhr.success){
                if (shopCategoryId === null){
					window.localStorage.setItem('allShop', JSON.stringify(xhr.data));
                    createShop(xhr.data);
                } else {
                    if (num === 1){
                    	window.localStorage.setItem('indexShop', JSON.stringify(xhr.data));
                        createIndexShop(xhr.data)
                    } else {
                        createSortShop(xhr.data);
                    }
                }
            }
        }
    });
}

// 周边页面的
function createShop(shopList) {
    console.log(shopList);
    $(shopList).each(function (index, shop) {
        // console.log(shopList[index].shopImageList[0].imageAddr);
        let shopBlock = $('<div class="sp col-xs-5" data-shopId="'+ shop.shopId +'">\n' +
            '                    <img src="'+ URL + shop.shopImageList[0].imageAddr +'">\n' +
            '                    <div class="sp-xx">\n' +
            '                        <span class="font_setting">'+ shop.shopName +'</span>\n' +
            '                        <span>￥'+ shop.price +'</span>\n' +
            '                    </div>\n' +
            '                </div>');
        console.log('1');
        $("#shopRow").append(shopBlock);
    })
}
// 分类页面的
function createSortShop(sortShopList) {
    $(sortShopList).each(function (index, shop) {
        let shopBlock = $('<div class="col-xs-6" data-shopId="'+ shop.shopId +'">\n' +
            '                <div class="thumbnail">\n' +
            '                    <img src="'+ URL + shop.shopImageList[0].imageAddr +'" alt="">\n' +
            '                    <div class="caption">\n' +
            '                        <p class="font_setting font_nowrap">'+ shop.shopName +'</p>\n' +
            '                        <p class="text-danger h4"><strong>￥'+ shop.price +'</strong></p>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>');
        $("#sortShopList").append(shopBlock);
    })
}
// 首页精选
function createIndexShop(ShopList) {
    $(ShopList).each(function (index, shop) {
        // console.log(shop);
        let shopBlock = $('<div class="slide-item" data-shopId="'+ shop.shopId +'">\n' +
            '                    <img src="'+ URL + shop.shopImageList[0].imageAddr +'">\n' +
            '                    <p class="font_setting font_nowrap" style="padding-top: 5px;">'+ shop.shopName +'</p>\n' +
            '                </div>');
        $(".slide-box").append(shopBlock);
    })
}