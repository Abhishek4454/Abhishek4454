const Post= require('../../../models/post');
const Comment=require('../../../models/comments');
module.exports.index=async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}

module.exports.destroy= async function(req,res){
    
    try {
        let post=await Post.findById(req.params.id);
        
            post.remove();
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message:'post created! '
                })
            }
            await Comment.deleteMany({post:req.params.id});
            
            return res.redirect('back');
           
       
    } catch (error) {
       
        return res.redirect('back');
    }
    
}