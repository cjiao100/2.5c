function getPost(index, size, postTitle, postContent) {
    let post;
    if (postContent === null || postTitle === null){
        post = 'pageIndex='+index+'&pageSize='+size;
    } else {
        post = 'postTitle='+postTitle+'&postContent='+postContent+'&pageIndex='+index+'&pageSize='+size;
    }
    $.ajax({
        type: 'get',
        url: URL+'/post?'+post,
        contentType: "application/json",
	    dataType: "json",
	   	xhrFields:{
	            withCredentials:true
		},
        success: function (xhr) {
            if (xhr.success){
                if (postContent === null || postTitle === null){
                	window.localStorage.setItem('indexPost', JSON.stringify(xhr.data));
                    createPost(xhr.data);
                } else {
                    createPost(xhr.data);
                }
            }
        }
    });
}

function createPost(postList) {
    let posts = postList.postList;
    $(posts).each(function (index, post) {
        let postBlock = $('<div class="tswz" data-postId="'+ post.postId +'" >\n' +
            '                <div class="tswz_img">\n' +
            '                    <img src="'+ URL +  post.postImageList[0].imageAddr +'">\n' +
            '                </div>\n' +
            '                <div class="tswz_ty">\n' +
            '                    <div>\n' +
            '                        <p class="font_setting font_nowrap"><strong>'+ post.postTitle +'</strong></p>\n' +
            '                        <p class="font_setting font_nowrap small">'+ post.postContent +'</p>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>');
        $('.body-block').append(postBlock);
    })
}

function getOnePost(postId) {
    let data = {};
    
	$.ajax({
		type: 'get',
		url: URL+'/post/'+postId,
		async: false,
		xhrFields:{
			withCredentials:true
		},
		success: function (xhr) {
			if (xhr.success){
				data = xhr.data;
			}
		}
	});
    
    return data;
}
