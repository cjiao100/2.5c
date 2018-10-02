$(function () {
	let sort = JSON.parse(window.localStorage.getItem('sort'));
	
    initArticle();
    initShop();
    
    if (sort==="" || sort===null){
    	getSort(1);
    } else {
    	addLi(sort);
    }
});

/*************************文章和商品的公共事件*********************************/

// 点击删除按钮，删除已发布的文章或商品
$(".container").delegate("[name=del]", "click", function () {
    let type = $(this).parents(".container").attr("id");
    let lump = $(this).parents('.lump');
    console.log(lump);
    if (type === 'mySp'){
        let shopId = get_Id(this, '.lump');
        // let shopId = $(this).parents('.lump').data("id");
        console.log(shopId);
        $.ajax({
            type: 'delete',
            url: URL+'/shop/'+shopId,
            xhrFields:{
                withCredentials:true
            },
            success: function (xhr) {
               if (xhr.success){
                   console.log(xhr);
                   lump.remove();
                   console.log(this);
               }
            }
        });
    } else if (type === 'myWz'){
        console.log(this);
        let postId = get_Id(this, '.lump');
        console.log(postId);
        $.ajax({
            type: 'delete',
            url: URL+'/post/' + postId,
            xhrFields:{
                withCredentials:true
            },
            success: function (xhr) {
                if (xhr.success){
                    console.log(xhr);
                    $(this).parents(".lump").remove();
                }
            }
        });
    }
    // $(this).parents(".lump").remove();
});

// 点击编辑按钮，编辑已发布的文章或商品
$(".container").delegate("[name=bj]", "click", function () {
    let type = $(this).parents(".container").attr("id");
    if (type === 'myWz'){
        let postId = get_Id(this, '.lump');
        $.ajax({
            type: 'get',
            url: URL+'/post/'+postId,
            xhrFields: {
                withCredentials: true
            },
            success: function (xhr) {
                if (xhr.success){
                    $("#wz").trigger("click");
                    $("#wz-name").val(xhr.data.postTitle);
                    $("#wz-article").val(xhr.data.postContent);
                    $("#pt").hide();
                    $("#aw").hide();
                    $('<button id="bj_wz" class="btn btn-primary" id="'+ postId +'">保存</button>').appendTo("#cwz");
                }
            }
        })
    } else if (type === 'mySp'){
        $("#sp").trigger("click");
        let shopId = get_Id(this, '.lump');
        $.ajax({
            type: 'get',
            url: URL+'/shop/'+shopId,
            xhrFields:{
                withCredentials:true
            },
            success: function (xhr) {
               if (xhr.success){
                   // $("#parameter").remove();
                   $("#bj_sp").remove();
                   $("#sp-name").val(xhr.data.shopName);
                   $("#sp-price").val(xhr.data.price);
                   let formats = new Array();
                   // console.log(xhr.data);
                   $.each(xhr.data.shopSpecificationList, function (index, format) {
                       formats.push(format.specificationName);
                   });
                   $.each(xhr.data.shopInformationList, function (index, parameter) {
                       if (index < xhr.data.shopInformationList.length || index >= 1){
                           let input = $("<tr>\n" +
                               "   <td><input id='parameter_name' type='text' placeholder='请输入' value='"+ parameter.informationTitle +"'></td>\n" +
                               "   <td><input type='text' value='"+ parameter.informationContent +"'></td>\n" +
                               "</tr>");
                           $('tbody').prepend(input);
                       }
                   });
                   $("#sort-menu").find('a').each(function (index, sort) {
                       if ($(sort).data('shopcategoryid') === xhr.data.shopCategoryId){
                           $(this).trigger('click')
                       }
                   });
                   $("#format").val(formats.toString());
                   $('<button id="bj_sp" data-id="'+shopId+'" class="btn btn-primary">保存</button>').appendTo("#csp");
               }
            }
        });

        $("#zs").hide();
        $("#xq").hide();
        $("#as").hide();
    }
});

//获取图片地址
function getObjectURL(file) {
    let url = null;
    if (window.createObjcectURL != undefined) {
        url = window.createOjcectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
//获取id
function get_Id(element, parents_element) {
    if (parents_element !== undefined){
        // console.log($(element).parents(parents_element).data("id"));
        return $(element).parents(parents_element).data("id");
    } else {
        return $(element).data('id');
    }
}
