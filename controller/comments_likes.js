import Post from "../models/Post"
import {validationResult} from "express-validator"


// create a comment
exports.addComment = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    try {
        const post = await Post.findById(req.params.postId)
        // console.log(req.user)
        if(!post){
            return res.status(404).json({error: 'post doesn\'t exists'})
        }
        const { text } = req.body;
        const newComment = {
            text,
            name: req.user.name,
            postedBy: req.user._id
        }

        post.comments.unshift(newComment)
        const result = await post.save();
        res.json(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// delete comment
exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        
        const comment = post.comments.find(comment => comment._id.toString() === req.params.commentId.toString());
        
        // comment exists or not
        if(!comment){
            return res.status(404).json({error: 'Comment doesn\'t exists'})
        }
        
        // comment is of logged in user or not
        if(comment.postedBy.toString() !== req.user._id.toString()){
            return res.status(404).json({error: 'user is not authorized'})
        }

        // get comment Index
        const commentIndex = post.comments.map(comment => comment._id).indexOf(req.params.commentId)
        post.comments.splice(commentIndex, 1)
        await post.save()
        res.json(post)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// post like
exports.likePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId);

        if(!post){
            return res.status(404).json({error: 'post doesn\'t exists'})
        }

        // check if the post already been liked
        // post.likes.map(like => {
        //     if(like.toString() == req.user._id.toString()){
        //         return res.status(404).json({msg: 'post is already liked'})
        //     }
        // })

        if(post.likes.filter(like => like.toString() === req.user._id.toString()).length > 0){
            const likeIndex = post.likes.map(like => {
                if(like.toString() === req.user._id.toString()){
                    post.likes.shift(like);
                    post.save();
                }
            });
            return res.json({post:post, msg: 'Post unliked'});
        }

        post.likes.unshift(req.user._id)
        await post.save();
        res.json({post:post, msg: 'post like'})

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}
