{
    //method to submit the form data
    let createPost= function(){
    let newPostForm=$('#new-post-form');
    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
           type:'post',
           url:'/post/create',
           data:newPostForm.serialize(),
           success:function(data){
              let newPost=newPostDom(data.data.post);
              $('posts-list-container>ul').prepend(newPost);
           },error:function(err){
            console.log(error.responseText);
           }
        });
    });

   }

   createPost();
}

//method to create post in DOM

let newPostDom=function(post){
  return $(`
  <li id="post-${post._id%}>
      <p>
          
          <small>
              <a class="delete-post-button" href="/post/destroy/${post.id}">X</a>
          </small>
          
          ${ post.content}
          <br>
          <small>
          ${post.user.name}
          </small>
      </p>
      <div class="post-comments">
          
              <form action="/comment/create" method="POST">
                  <input type="text" name="content" placeholder="Type Here to add comment..." required>
                  <input type="hidden" name="post" value="${ post._id }" >
                  <input type="submit" value="Add Comment">
              </form>
  
         
  
          <div class="post-comments-list">
              <ul id="post-comments-${post._id }">
                 
              </ul>
          </div>
      </div>
      
  </li>`)
}