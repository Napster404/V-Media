import { setPosts } from '../ReduxStore/postSlice';

const fetchPosts = async (dispatch, getPosts) => {
    const posts = await getPosts({ variables: {} })
    dispatch(setPosts(posts.data.posts));
}

export default fetchPosts;
