//有关文章的函数

//添加文章
$("#aw").click(function () {
    let articleTitle = $("#wz-name").val();
    let articleContent = $("#wz-article").val();
    let article = new FormData();
    let image_wz = document.querySelector('#image_wz');
    let num = 0;

    //获取图片
    $.each(image_wz.files, function (index, img) {
        article.append('postImages', img);
        num++;
    });

    let postInfo = {
        postTitle: articleTitle,
        postContent: articleContent,
        imageNum: num
    };
    article.append('postInfo', JSON.stringify(postInfo));

    //发送请求
    $.ajax({
        type: "post",
        url: URL+'/post',
        data: article,
        contentType: false,
        processData: false,
        cache: false,
        xhrFields:{
            withCredentials:true
        },
        success: function (xhr) {
            // console.log(xhr);
            if (xhr.success){
                $("#back-wz").trigger('click');
            }
        }
    })
});


/*******************************文章中需要的函数******************************************/

function initArticle() {
    $(".lump").remove();

    $.ajax({
        type: 'get',
        url: URL+'/post/myPost',
        xhrFields:{
            withCredentials:true
        },
        success: function (xhr) {
            if (xhr.success){
                // console.log(xhr.data);
                initMyArticle(xhr.data);
            }
        }
    })
}

function initMyArticle(postList) {
    $(postList).each(function (index, post) {
        let $wz = $('<div class="thumbnail lump" data-id="'+ post.postId+'">\n' +
            '            <img src="'+ URL + post.postImageAddr +'">\n' +
            '            <div class="caption clearfix">\n' +
            '              <div class="article_mes">' +
            '                 <h4>'+ post.postTitle +'</h4>\n' +
            '                 <p class="small" data-userId="'+ post.userInfo.userId +'"> 笔者：'+ post.userInfo.nickName   +'</p>\n' +
            '              </div>' +
            '              <div class="btn-group">\n' +
            '                <a name="bj" class="btn btn-primary">编辑</a>\n' +
            '                <a name="del" class="btn btn-danger">删除</a>\n' +
            '              </div>\n' +
            '            </div>\n' +
            '        </div>');
        $("#myWz").prepend($wz);
    })
}