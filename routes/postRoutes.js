import express from "express"

const router = express.Router()


import {newPost,
        showAllPosts,
        getPostById,
        updatePost,
        deletePost,
        postsByCategory} from "../controller/post"

import {addComment,
        deleteComment,
        likePost} from "../controller/comments_likes"


import {check} from "express-validator"
import auth from "../middleware/auth"
import fileUpload from "../utils/fileupload"


// create posts
router.post('/create',fileUpload.single('image'), auth, [
    check('title', 'Enter title field').not().isEmpty(),
    check('content', 'Enter content field').not().isEmpty(),
    check('category', 'Enter category field').not().isEmpty(),
] ,newPost)

// get all posts
router.get('/get-all', showAllPosts);

// get a post
router.get('/post/:postId', getPostById)

// update a post
router.put('/edit-post/:postId',fileUpload.single('image'), auth,[
    check('title', 'Enter title field').not().isEmpty(),
    check('content', 'Enter content field').not().isEmpty(),
], updatePost)

// delete a post
router.delete('/delete-post/:postId', auth,deletePost)

// post a comment
router.post('/comment/:postId',
            auth, 
            [check('text', 'Enter comment field').not().isEmpty()],
            addComment)

// delete comment
router.delete('/delete-comment/:postId/:commentId', auth,deleteComment)

// post a like
router.post('/like/:postId', auth,likePost)

// get a post
router.get('/post-by-category',postsByCategory)





module.exports = router
