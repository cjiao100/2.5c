$(".pagination li").click(function () {
    $(this).addClass('active').siblings('li').removeClass('active');
    if ($(this).data('type') === 1){
        $("#put").hide();
        $('#get').show();
    } else {
        $("#put").show();
        $('#get').hide();
    }
})