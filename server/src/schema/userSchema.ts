import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import User from "../models/user";
import Post from "../models/post";
import Room from "../models/room";

import { PostType } from "./postSchema";
import { RoomType } from "./roomSchema";

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    _id: { type: GraphQLID },
    heading: { type: GraphQLString },
    description: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }),
});

const UserType: any = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    avatar: { type: GraphQLString },
    email: { type: GraphQLString },
    eventsArray: { type: GraphQLList(EventType) },
    userPosts: {
      type: GraphQLList(PostType),
      resolve(parent: any, args: any) {
        return Post.find({ userId: parent._id });
      },
    },
    userRooms: {
      type: GraphQLList(RoomType),
      resolve(parent: any, args: any) {
        return Room.find({ usersArray: parent._id });
      },
    },
  }),
});

const UserRootQuery = {
};

const UserMutation = {
  user: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      return User.findById(args.id);
    },
  },

  addUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      avatar: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      let user = {
        name: args.name,
        avatar: args.avatar,
        email: args.email,
      };
      return User.findOneAndUpdate({ email: args.email }, user, {
        returnOriginal: false,
        upsert: true,
      });
    },
  },

  addEvent: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      heading: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      timestamp: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      let event = {
        heading: args.heading,
        description: args.description,
        timestamp: args.timestamp,
      };
      return User.findByIdAndUpdate(
        args.id,
        { $push: { eventsArray: event } },
        { returnOriginal: false }
      );
    },
  },

  deleteEvent: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      eventId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      let update = {
        $pull: { eventsArray: { _id: args.eventId } },
      };
      return User.findByIdAndUpdate(args.id, update, { returnOriginal: false });
    },
  },
};

export { UserType, UserRootQuery, UserMutation };
