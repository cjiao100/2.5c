$(function () {
	let h = screen.height-100 + "px";
    $(".fenlei > div, #right").css({
        height: h
    });

    $("[name='search']").click(function () {
        let y = $(window).height()-50;
        $("#b").css("height", y);
        $(".search").fadeIn("100");
        $("#search_content").trigger("click").focus();
    });
    $("#b").click(function () {
        $(".search").fadeOut("100");
    })
});

$("#shopRow").delegate('.sp', 'click', function () {
    let shopId = $(this).data('shopid');
    // console.log(this);
    window.location.href = "details_sp.html?shopId="+shopId;
});

$("#right").delegate("li", 'click', function () {
    console.log("1");
    let spname = $(this).children("p").text();
    let CategoryId = $(this).data('shopcategoryid');
    window.location.href = "details_fl.html?fl=" + spname+'&shopCategoryId=' + CategoryId;
});

$("#str").click(function () {
   window.location.href = "index_periphery.html"
});
$("#lis").click(function () {
   window.location.href = "index_sort.html"
});
$("#ide").click(function () {
   window.location.href = "index_index.html"
});
$("#mesr").click(function () {
   window.location.href = "index_chat.html"
});
$("#my").click(function () {
   window.location.href = "index_my.html"
});

// 选择搜索的类型
$('#search_sort li').click(function () {
    let style = $(this).data('style');
    $("#search_style span:first-child").text($(this).text());
    $("#search_style").data('style', style);
});

// 搜索
$("#search_").click(function () {
    let style = $("#search_style").data('style');
    let content = $("#search_content").val();
    window.location.href = 'search.html?style=' + style + '&content=' + content;
});