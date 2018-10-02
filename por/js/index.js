$(function () {
     /*if (!cache.on('index')){
         cache.set('index', $('html'));
     } else {
         $(document).append(cache.get('index'));
     }*/
    let h = screen.height-100 + "px";
    $(".fenlei > div, #right").css({
        height: h
    });

    $("[name='search']").click(function () {
        let y = $(window).height()-50;
        $("#b").css("height", y);
        $(".search").fadeIn("100");
        $("#search").trigger("click").focus();
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
