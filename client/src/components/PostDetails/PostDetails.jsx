import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getPost , getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) =>  state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    // route -> /posts/:id
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        //we are using the tags of the individual post that we fetched to find the recommended post....after this dispatch our {posts} will also get populated
        //now in our posts since we searched for the tags present in our individual post ...so in the postsbySearch we will get that post along with other post which have that tag
        //so in recommended post we need to remove the present post
        if (post) {
            dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);
    //when we filter we get individual post so we destructured it to get the id
    if (!post) return null;
    const openPost = (_id) => navigate(`/posts/${_id}`);

    if (isLoading) {
        return (
          <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
          </Paper>
        );
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created by: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                <CommentSection post={post} />
                <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {recommendedPosts.length ? (
                <div className={classes.section}>
                <Typography gutterBottom variant='h5' style={{ fontWeight: '600' }}>
                    You might also like:
                </Typography>
                <Divider />
                    <div className={classes.recommendedPosts}>
                    {recommendedPosts.map(
                        ({ title, name, message, likes, selectedFile, _id }) => (
                        <Paper
                            style={{
                            padding: '10px',
                            borderRadius: '15px',
                            width: 'fit-content',
                            margin: '20px',
                            }}
                            elevation={6}
                            onClick={() => openPost(_id)}
                            key={_id}
                        >
                            <Typography gutterBottom variant='h6'>
                            {title}
                            </Typography>
                            <Typography gutterBottom variant='subtitle2'>
                            {name}
                            </Typography>
                            <Typography gutterBottom variant='subtitle2'>
                            {message.split(' ').splice(0, 20).join(' ')}...
                            </Typography>
                            <Typography gutterBottom variant='subtitle1'>
                            Likes: {likes.length}
                            </Typography>
                            <img
                            className={classes.recommendedPosts__image}
                            src={selectedFile}
                            style={{
                                width: '204px',
                                margin: '0px auto',
                                borderRadius: '8px',
                            }}
                            />
                        </Paper>
                        )
                    )}
                    </div>
                </div>
            ) : null}
        </Paper>
    );
};

export default PostDetails;
