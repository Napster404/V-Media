import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import Post from "../models/post";
import User from "../models/user";

import { UserType } from "./userSchema";

const LikeType = new GraphQLObjectType({
  name: "Like",
  fields: () => ({
    _id: { type: GraphQLID },
    likeType: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent: any, args: any) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    _id: { type: GraphQLID },
    content: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent: any, args: any) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const PostType: any = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: { type: GraphQLID },
    text: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    likesArray: { type: GraphQLList(LikeType) },
    commentsArray: { type: GraphQLList(CommentType) },
    user: {
      type: UserType,
      resolve(parent: any, args: any) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const PostRootQuery = {};

const PostMutation = {
  post: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      return Post.findById(args.id);
    },
  },

  posts: {
    type: new GraphQLList(PostType),
    args: { placeHolder: {type: GraphQLInt}},
    resolve(parent: any, args: any) {
      return Post.find({});
    },
  },

  addPost: {
    type: PostType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      text: { type: new GraphQLNonNull(GraphQLString) },
      imgUrl: { type: GraphQLString },
      timestamp: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      let post = new Post({
        userId: args.userId,
        text: args.text,
        imgUrl: args.imgUrl,
        timestamp: args.timestamp,
      });
      return post.save();
    },
  },

  deletePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      return Post.findByIdAndDelete(args.id);
    },
  },

  addLike: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      likeType: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(parent: any, args: any) {
      let like = {
        userId: args.userId,
        likeType: args.likeType,
      };
      return Post.findByIdAndUpdate(
        args.id,
        { $push: { likesArray: like } },
        { returnOriginal: false }
      );
    },
  },

  deleteLike: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      let update = {
        $pull: { likesArray: { userId: args.userId } },
      };
      return Post.findByIdAndUpdate(args.id, update, { returnOriginal: false });
    },
  },

  addComment: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      content: { type: new GraphQLNonNull(GraphQLString) },
      timestamp: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      let comment = {
        userId: args.userId,
        content: args.content,
        timestamp: args.timestamp,
      };
      return Post.findByIdAndUpdate(
        args.id,
        { $push: { commentsArray: comment } },
        { returnOriginal: false }
      );
    },
  },

  deleteComment: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      commentId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      let update = {
        $pull: { commentsArray: { _id: args.commentId } },
      };
      return Post.findByIdAndUpdate(args.id, update, { returnOriginal: false });
    },
  },
};

export { PostType, PostRootQuery, PostMutation };
