$(function () {
    let postId = $.getUrlParam('postId');
    $.ajax({
        type: 'get',
        url: URL+'/post/'+postId,
        xhrFields:{
            withCredentials:true
        },
        success: function (xhr) {
            if (xhr.success){
                postDetails(xhr.data);
            }
        }
    })
});

function postDetails(post) {
    let Content = post.postContent.replace(/\n/g, '<br>');

    console.log(post.postContent);
    console.log(Content);

    $("#nav_title").text(post.postTitle);
    $("#post_title").text(post.postTitle);
    $("#author_name").text();
    // $("#post_content").text(Content)

    $("#post_content").append(Content);
}