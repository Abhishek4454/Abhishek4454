const Post=require('../models/post');
const Comment=require('../models/comments');

module.exports.create = async function(req, res){
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });     

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'post created! '
            })
        }
        req.flash('Post Published');
        return res.redirect('back'); 
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
    
   
}

module.exports.destroy= async function(req,res){
    
    try {
        let post=await Post.findById(req.params.id);
        if(post.user=req.user.id){
            post.remove();

            await Comment.deleteMany({post:req.params.id});
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id

                    },
                    message:"Posts deleted successfully !"
                });
            }

            req.flash('success','Posts and associated comments deleted !');
            return res.redirect('back');
           
        }else{
            req.flash('error','You cannot delete this Posts !');

            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
    
}

