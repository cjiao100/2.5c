$(function () {
    let content = $.getUrlParam('content');
    let style = $.getUrlParam('style');
    let $con = $(".container");

    // console.log(content.length === 0);
    if (content.length === 0){
        $con.append('<p class="noResult">未找到相关商品</p>');
        return false;
    }

    console.log(style);

    switch (style) {
        case '0':
            $con.append('<div id="shopRow" class="row"></div>');
            getShop(1, 10, content, null);
            break;
        case '1':
            $con.append('<div class="body-block"></div>');
            getPost(1, 10, content, content);
            break;
        case '2':
            $con.append('<ul class="list-group" id="myFriendList"></ul>');
            searchUser(content);
    }
});

$(".container").delegate('#myFriendList > .list-group-item', 'click', function () {
	// console.log($(this).data('userid'));
    let userID = $(this).data('userid');
    window.location.href = 'friends-index.html?userId=' + userID;
});