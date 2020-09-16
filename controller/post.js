import Post from "../models/Post"
import {validationResult} from "express-validator"
import fs from "fs"



// create post
exports.newPost = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        if(req.file){
            fs.unlink(req.file.path, err => {
                console.log(err)
            })
        }
        return res.status(400).json({errors: errors.array() });
    }

    try {
        const { title, content, category } = req.body;
        const newPost = new Post({
            title,
            content,
            category,
            image: req.file.path,
            createdBy: req.user._id
        })

        const post = await newPost.save();
        res.json(post)

    } catch (err) {
        if(req.file){
            fs.unlink(req.file.path, err => {
                console.log(err)
            })
        }
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// get all posts
exports.showAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
                                .populate("createdBy", "-password")
                                .sort({createdAt: -1})
        if(posts.length == 0){
            return res.status(404).json({msg: 'Posts not found'})
        }
        
        res.json(posts)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// get a post
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId)
                                .populate("createdBy", "-password")
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        res.json(post)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// update post
exports.updatePost = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        if(req.file){
            fs.unlink(req.file.path, err => {
                console.log(err)
            })
        }
        return res.status(422).json({errors: errors.array() });
    }

    try {
        const postId = req.params.postId;

        let updateTitle = req.body.title;
        let updateContent = req.body.content;
        let updateCategory = req.body.category;

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }

        post.title = updateTitle;
        post.content = updateContent;        
        post.category = updateCategory;
        if(req.file){
            fs.unlink(post.image, err => {
                console.log(err)
            })
            let updateImage = req.file.path;
            post.image = updateImage;
        }
        // console.log(post)
        const updatedPost = await post.save()
        res.json(updatedPost)
    } catch (err) {
        if(req.file){
            fs.unlink(req.file.path, err => {
                console.log(err)
            })
        }
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// delete post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletePost = await Post.findById(postId);
        // console.log(deletePost)
        if(!deletePost){
            return res.status(404).json({msg: 'Post not found'})
        }
        if(req.user._id.toString() !== deletePost.createdBy._id.toString()){
            return res.status(401).json({msg: 'No authorized to delete'})
        }
        fs.unlink(deletePost.image, err => {
            console.log(err)
        })
        await deletePost.remove();
        res.json(deletePost)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// get posts by category
exports.postsByCategory = async (req, res) => {
    const categoryName = req.query.category;
    try {
        const posts = await Post.find({category: categoryName})
                                .populate("createdBy", "-password")
                                .sort({createdAt: -1})
        if(posts.length == 0){
            return res.status(404).json({msg: 'Posts not found'})
        }
        
        res.json(posts)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}