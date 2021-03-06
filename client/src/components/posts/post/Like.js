import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likePost } from '../../../action/post'

const Like = ({likeNum, auth:{loading, isAuthenticated}, likePost, post: {post}}) => {
    // console.log(loading, post)

    const likeHandler = () => {
        likePost(post._id)
    }

    return (
        <div style={{display: 'flex'}}>
            {isAuthenticated ? (
                <>
                    <h4 className="blue-color" onClick={() => likeHandler()}><i class="thumbs up icon"></i></h4>
                    <p style={{marginLeft: '8px'}}>{likeNum.length}</p>
                </> ): null
            }
        </div>
    )
}

Like.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, {likePost})(Like) 
