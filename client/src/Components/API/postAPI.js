import { gql } from 'apollo-boost';

const GetPost = gql`
    mutation GetPost($id: ID!){
        post(id: $id){
            _id
            text
            imgUrl
            timestamp
            likesArray{
                _id
                likeType
                user{
                    _id
                    name
                    avatar
                }
            }
            commentsArray{
                _id
                content
                timestamp
                user{
                    _id
                    name
                    avatar
                }
            }
            user{
                _id
                name
                avatar
            }
        }
    }
`;

const GetPosts = gql`
    mutation GetPosts($placeHolder: Int){
        posts(placeHolder: $placeHolder){
            _id
            text
            imgUrl
            timestamp
            likesArray{
                _id
                likeType
                user{
                    _id
                    name
                    avatar
                }
            }
            commentsArray{
                _id
                content
                timestamp
                user{
                    _id
                    name
                    avatar
                }
            }
            user{
                _id
                name
                avatar
            }
        }
    }
`;

const AddPost = gql`
    mutation AddPost($userId: ID!, $text: String!, $timestamp: String!, $imgUrl: String){
        addPost(userId: $userId, text: $text, timestamp: $timestamp, imgUrl: $imgUrl){
            _id
        }
    }
`;

const DeletePost = gql`
    mutation DeletePost($id: ID!){
        deletePost(id: $id){
            _id
        }
    }
`;

const AddLike = gql`
    mutation AddLike($id: ID!, $userId: ID!, $likeType: Int!){
        addLike(id: $id, userId: $userId, likeType: $likeType){
            _id
            text
            imgUrl
            timestamp
            likesArray{
                _id
                likeType
                user{
                    _id
                    name
                    avatar
                }
            }
            commentsArray{
                _id
                content
                timestamp
                user{
                    _id
                    name
                    avatar
                }
            }
            user{
                _id
                name
                avatar
            }
        }
    }
`;

const DeleteLike = gql`
    mutation DeleteLike($id: ID!, $userId: ID!){
        deleteLike(id: $id, userId: $userId){
            _id
            text
            imgUrl
            timestamp
            likesArray{
                _id
                likeType
                user{
                    _id
                    name
                    avatar
                }
            }
            commentsArray{
                _id
                content
                timestamp
                user{
                    _id
                    name
                    avatar
                }
            }
            user{
                _id
                name
                avatar
            }
        }
    }
`;

const AddComment = gql`
    mutation AddComment($id: ID!, $userId: ID!, $content: String!, $timestamp: String!){
        addComment(id: $id, userId: $userId, content: $content, timestamp: $timestamp){
            _id
            text
            imgUrl
            timestamp
            likesArray{
                _id
                likeType
                user{
                    _id
                    name
                    avatar
                }
            }
            commentsArray{
                _id
                content
                timestamp
                user{
                    _id
                    name
                    avatar
                }
            }
            user{
                _id
                name
                avatar
            }
        }
    }
`;

const DeleteComment = gql`
    mutation DeleteComment($id: ID!, $commentId: ID!){
        deleteComment(id: $id, commentId: $commentId){
            _id
            text
            imgUrl
            timestamp
            likesArray{
                _id
                likeType
                user{
                    _id
                    name
                    avatar
                }
            }
            commentsArray{
                _id
                content
                timestamp
                user{
                    _id
                    name
                    avatar
                }
            }
            user{
                _id
                name
                avatar
            }
        }
    }
`;

export { GetPost, GetPosts, AddPost, DeletePost, AddLike, DeleteLike, AddComment, DeleteComment };