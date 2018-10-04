function toast() {
    let x = $("#snackbar");
    x.addClass('show');
    setTimeout(function(){
        x.removeClass('show')
        }, 5000);
}