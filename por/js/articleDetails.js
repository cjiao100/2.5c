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
    let name = getUser(post.userId).nickName
	
	// console.log(post);
	/*console.log(post.postContent);
	console.log(Content);*/
	// console.log(getUser(post.userId).nickName);

    $("#nav_title").text(post.postTitle);
    $("#post_title").text(post.postTitle);
    $("#author_name").text(name);
    // $("#post_content").text(Content)

    $("#post_content").append(Content);
}

$('#opencom').click(function () {
	window.location.href = 'comment.html?type=2&belongId=' + $.getUrlParam('postId');
});
