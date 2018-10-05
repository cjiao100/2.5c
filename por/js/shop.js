let sp_name, hq_price, formats, sort;

//添加商品
$("#as").click(function () {
    sp_name = $("#sp-name").val();
    hq_price = $("#sp-price").val();
    formats = $("#format").val();

    let price = process_price(hq_price);
    let formatList = process_format(formats);
    let parameter = process_parameter($("tbody"));
    let sp_img = new FormData();
    let i=0, j=0;
    let shopInfoStr;

    let lb = document.querySelector('#image_lb');
    let xq = document.querySelector('#image_xq');

    $.each(lb.files, function (index, img) {
        sp_img.append('shopCoverImages', img);
        i++;
    });
    $.each(xq.files, function (index, img) {
        sp_img.append('shopInformationImages', img);
        j++
    });

    // 编写JSON
    shopInfoStr = {
        price: price,
        shopCategoryId: sort,
        shopInformationList: parameter,
        shopName: sp_name,
        shopSpecificationList: formatList,
        shopCoverImageNum: i,
        shopInformationImageNum: j
    };
    sp_img.append('shopInfoStr', JSON.stringify(shopInfoStr));
    console.log(sp_img.getAll('shopCoverImages'));
    console.log(sp_img.getAll('shopInformationImages'));
    console.log(i + ',' + j);
    console.log(sp_img);
    // 发送AJAX请求
    $.ajax({
        type: 'post',
        url: URL+'/shop',
        data: sp_img,
        contentType: false,
        processData: false,
        cache: false,
        xhrFields:{
            withCredentials:true
        },
        success: function (xhr) {
            console.log(xhr);
            if (xhr.success){
                $("#back").trigger("click");
                parameter = [];
            }
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
});
// 保存已编辑商品的信息
$(".container").delegate("#bj_sp", "click", function () {
    // 编辑商品
    sp_name = $("#sp-name").val();
    hq_price = $("#sp-price").val();
    formats = $("#format").val();

    let shopId = get_Id(this);
    let price = process_price(hq_price);
    let formatList = process_format(formats);
    let parameter = process_parameter($("tbody"));

    let modifyInfo = {
        price: price,
        shopCategoryId: sort,
        shopInformationList: parameter,
        shopName: sp_name,
        shopSpecificationList: formatList
    };
    console.log(modifyInfo);
    console.log(shopId);
    $.ajax({
        url: URL+'/shop/'+shopId,
        type: 'put',
        data: JSON.stringify(modifyInfo),
        contentType: "application/json",
        dataType: "json",
        xhrFields:{
            withCredentials: true
        },
        success: function (xhr) {
            if (xhr.success) {
                $("#back").trigger("click");
                parameter = [];
            }
        }
    })
});

/****************************函数分割线********************************/

//处理价格
function process_price(price) {
    let index = price.length-price.indexOf('.');
    let Bprice;

    // 处理价格，自动添加小数点后两位
    switch (index){
        case 3:
            Bprice = price;
            break;
        case 2:
            Bprice = price+'0';
            break;
        default:
            if (price.indexOf('.')=== -1){
                Bprice = price+'0';
                break;
            } else {
                $("#sp-price").val("");
                $("#sp-price").attr("placeholder", "最多只能输入两位小数");
                return;
            }
    }

    return Bprice;
}
//处理规格
function process_format(formats){
    let formatList = new Array();
    formats = formats.split(",");
    for (let i=0; i<formats.length; i++){
        formats[i] = formats[i].split("，");
        for (let j=0; j<formats[i].length; j++){
            let f={
                specificationName: formats[i][j]
            };
            formatList.push(f);
        }
    }

    return formatList;
}
//处理参数
function process_parameter(table){
    let parameter = [];
    table.find("tr").each(function(i,e){
        let key = $(e).find("td").eq(0).children().val();
        let val = $(e).find("td").eq(1).children().val();
        parameter.push({
            informationTitle: key,
            informationContent: val
        });
    });
    let length = parameter.length;
    parameter.length = length-1;

    return parameter;
}

//初始化商品发布页面
function initShop(id) {
    $(".lump").remove();

    $.ajax({
        type: 'get',
        url: URL+'/shop/myShop/' + id,
        xhrFields:{
            withCredentials:true
        },
        success: function (xhr) {
            if (xhr.success){
                // console.log(xhr.data);
                initMyShop(xhr.data)
            }
        }
    })
}
//创建我的商品界面的商品
function initMyShop(shopList) {
    $(shopList).each(function (index, shop) {
        let formats = [];
        $.each(shop.shopSpecificationList, function (index, format) {
            formats.push(format);
        });
        // 创建变量
        let $sp = $('<div class="media lump" data-id="'+ shop.shopId +'"> \n' +
            '            <div class="media-left">\n' +
            '              <img src="'+ URL+shop.shopImageAddr +'" alt="" />\n' +
            '            </div>\n' +
            '            <div class="media-body">\n' +
            '              <h4 class="font_setting shop_name">'+ shop.shopName +'</h4>\n' +
            '              <p class="small format">规格：'+ formats.toString() +'</p>\n' +
            '              <p><strong>￥'+ shop.price +'</strong></p>\n' +
            '            </div>\n' +
            '            <div class="media-bottom clearfix">\n' +
            '              <div class="btn-group">\n' +
            '                <a name="bj" class="btn btn-primary">编辑</a>\n' +
            '                <a name="del" class="btn btn-danger">删除</a>\n' +
            '              </div>\n' +
            '            </div>\n' +
            '          </div>');
        $("#mySp").prepend($sp);
    });
}


//
function listFade(e) {
    let sortText = $(e).text();
    sort = $(e).attr('data-shopCategoryId');
    console.log(sort);
    $("#sort").text(sortText);
    $("#sort-menu").fadeOut();0
}
