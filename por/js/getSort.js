function getSort(index) {
    $.ajax({
        url: URL+'/shop/category',
        type: 'get',
        success: function (xhr) {
            if (xhr.success){
                // console.log(xhr.data);
                window.localStorage.setItem('sort', JSON.stringify(xhr.data));
                if (index === 1){
                    // cache.set('addList', xhr);
                    addLi(xhr.data);
                } else if (index === 0){
                    // cache.set('indexList', xhr);
                    indexUl(xhr.data);
                }
            }
        }
    });
}


/***************************添加商品中的分类列表*****************************************/
function addLi(list) {
    let i=1;
    $(list).each(function (index, item) {
        if (item.shopCategoryId !== 93){
            if (item.shopCategoryId !== 58){
                let li = $('<li class="sort-li" data-name="sun-menu">\n' +
                    '   <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" data-shopCategoryId="'+ item.shopCategoryId +'">'+ item.categoryName +'</button>\n' +
                    '</li>');
                $("#sort-menu").append(li);
                let ul = $('<ul class="dropdown-menu childList"></ul>');
                $(li).append(ul);
                addUl(item.childrenCategoryList, item.shopCategoryId, ul);
            } else {
                let li = $('<li class="sort-li">\n' +
                    '   <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" data-shopCategoryId="'+ item.shopCategoryId +'">'+ item.categoryName +'</button>\n' +
                    '</li>');
                $("#sort-menu").append(li);
            }
        }
    });
}
function addUl(list, CategoryId, ul) {
    $(list).each(function (index, item) {
        if (item.parentId === CategoryId){
            let li = $('<li class="childList-li"><a href="#" data-shopCategoryId="'+ item.shopCategoryId +'" onclick="listFade(this)">'+ item.categoryName +'</a></li>');
            $(ul).append(li);
        }
    })
}
/************************主页中的分类列表*******************************************/
function indexUl(list) {
	console.log(list);
    $(list).each(function (index, item) {
        if (item.shopCategoryId === 58){
            let ul = $('<ul class="list-group clearfix">\n' +
                '                               <p class="sort-title" id="other">其他</p>\n' +
                '                               <li class="sp list-group-item" data-shopCategoryId="58">\n' +
                '                                   <img src="img/header.svg" alt="">\n' +
                '                                   <p>其他</p>\n' +
                '                               </li>\n' +
                '                           </ul>');
            $("#right-list").append(ul);
        } else {
            let ul = $('<ul class="list-group clearfix">\n' +
                '                               <p id="rm" class="sort-title">'+ item.categoryName +'</p>\n' +
                '                               </ul>');
            if (item.shopCategoryId === 93){
                $("#right-list").prepend(ul);
            } else {
                $("#right-list").append(ul);
            }
             indexLi(item.childrenCategoryList, item.shopCategoryId, ul);
        }
    });
}
function indexLi(list, categoryId, ul) {
    $(list).each(function (index, item) {
        if (item.parentId === categoryId){
            let li = $('<li class="sp list-group-item" data-shopCategoryId="'+ item.shopCategoryId +'">\n' +
                '                                   <div><img src="'+ URL + item.imageAddr +'" alt=""></div>\n' +
                '                                   <p class="font_setting">'+ item.categoryName +'</p>\n' +
                '                               </li>');
            $(ul).append(li);
        }
    })
}