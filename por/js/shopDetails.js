$(function () {

    let shopId = $.getUrlParam('shopId');
    $.ajax({
        type: 'get',
        url: URL+'/shop/'+shopId,
        xhrFields:{
            withCredentials:true
        },
        success: function (xhr) {
            if (xhr.success){
                shopDetails(xhr.data);
            }
        }
    });
});

function shopDetails(shop) {
    $("#price").text('￥'+shop.price);
    $("#name").text(shop.shopName);
    $.each(shop.shopImageList, function (index, shopImg) {
        if (shopImg.type === 0){
            $('#informationimg').append('<img style="width: 100%" src="'+ URL + shopImg.imageAddr +'">')
        } else if (shopImg.type === 1){
            $("#coverimg").append($('<div class="item">\n' +
                '                    <img style="width: 100%" src="'+ URL + shopImg.imageAddr +'">\n' +
                '                </div>'));
        }
    });
    console.log(shop.shopImageList);
    $(".item:first-child").addClass('active');

    let serve = $('<div id="nei">\n' +
        '               <h4><strong>基本服务</strong></h4>\n' +
        '               <ul class="list-group">\n' +
        '                   <li class="list-group-item">七天无理由退货</li>\n' +
        '                   <li class="list-group-item">免运费</li>\n' +
        '                   <li class="list-group-item">四天内发货</li>\n' +
        '               </ul>\n' +
        '               <button id="close">确认</button>\n' +
        '           </div>');
    let size = $('<div id="nei">\n' +
        '               <h4><strong>规格</strong></h4>\n' +
        '               <ul id="sizeList" class="list-group" style="padding: 10px"></ul>\n' +
        '               <button id="close">确认</button>\n' +
        '           </div>');
    let argument = $('<div id="nei">\n' +
        '               <h4><strong>参数</strong></h4>\n' +
        '               <table id="argumentList" class="table table-bordered"></table>\n' +
        '               <button id="close">确认</button>\n' +
        '           </div>');

    $("#serve").append(serve);
    $("#size").append(size);
    $("#argument").append(argument);

    $.each(shop.shopSpecificationList, function (index, format) {
        if (index < shop.shopSpecificationList.length){
            let formats = $('<li class="list-group-item">'+ format.specificationName +'</li>');
            $('#sizeList').append(formats);
        }
    });
    $.each(shop.shopInformationList, function (index, parameter) {
        if (index < shop.shopSpecificationList.length){
            let parameters = $('<tr class="table-bordered">' +
                '<td>'+ parameter.informationTitle +'</td>' +
                '<td>'+ parameter.informationContent +'</td>' +
                '</tr>');
            $('#argumentList').append(parameters);
        }
    });
}

$('#opencom').click(function () {
   window.location.href =  'comment.html?type=1&belongId=' + $.getUrlParam('shopId');
});