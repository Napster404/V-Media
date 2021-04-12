import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import Room from "../models/room";
import User from "../models/user";

import { UserType } from "./userSchema";

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    replyId: { type: GraphQLID },
    username: { type: GraphQLString },
    content: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }),
});

const RoomType = new GraphQLObjectType({
  name: "Room",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    messagesArray: { type: GraphQLList(MessageType) },
    users: {
      type: GraphQLList(UserType),
      resolve(parent: any, args: any) {
        return User.find({ _id: { $in: parent.usersArray } });
      },
    },
  }),
});

const RoomRootQuery = {
  rooms: {
    type: GraphQLList(RoomType),
    resolve(parent: any, args: any) {
      return Room.find();
    },
  },
};

const RoomMutation = {
  room: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      return Room.findById({ _id: args.id });
    },
  },

  addDirectRoom: {
    type: RoomType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      userEmail: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
    },
    resolve(parent: any, args: any) {
      return addDirectRoomUtil(args.userId, args.userEmail, args.title);
    },
  },

  deleteDirectRoom: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      return Room.findByIdAndDelete(args.id);
    },
  },

  addGroupRoom: {
    type: RoomType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      let room = new Room({
        title: args.title,
        usersArray: [args.userId],
      });
      return room.save();
    },
  },

  addMember: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userEmail: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      return addMemberUtil(args.id, args.userEmail);
    },
  },

  deleteMember: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      return deleteMemberUtil(args.id, args.userId, args.username);
    },
  },

  addMessage: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      username: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) },
      timestamp: { type: new GraphQLNonNull(GraphQLString) },
      replyId: { type: GraphQLID },
    },
    resolve(parent: any, args: any) {
      let message = {
        userId: args.userId,
        username: args.username,
        content: args.content,
        timestamp: args.timestamp,
        replyId: args.replyId,
      };
      return Room.findByIdAndUpdate(
        args.id,
        { $push: { messagesArray: message } },
        { returnOriginal: false }
      );
    },
  },

  deleteMessage: {
    type: RoomType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      messageId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: any) {
      let update = { $pull: { messagesArray: { _id: args.messageId } } };
      return Room.findByIdAndUpdate(args.id, update, { returnOriginal: false });
    },
  },
};

const addDirectRoomUtil = async (
  userId: String,
  userEmail: String,
  title: String
) => {
  let secondUser: any = await User.findOne({ email: userEmail });
  if (!secondUser || secondUser._id === userId) {
    return null;
  } else {
    let room = new Room({
      title: title,
      usersArray: [userId, secondUser._id],
    });
    return room.save();
  }
};

const addMemberUtil = async (id: String, userEmail: String) => {
  let secondUser: any = await User.findOne({ email: userEmail });
  if (secondUser) {
    let message = {
      userId: secondUser._id,
      username: "AAAAA",
      content: secondUser.name + " has been Added",
      timestamp: String(Date.now()),
    };

    return Room.findByIdAndUpdate(
      id,
      { $push: { usersArray: secondUser._id, messagesArray: message } },
      { returnOriginal: false }
    );
  } else {
    return null;
  }
};

const deleteMemberUtil = async (
  id: String,
  userId: String,
  username: String
) => {
  let message = {
    userId: userId,
    username: "AAAAA",
    content: username + " left",
    timestamp: String(Date.now()),
  };

  let update = {
    $pull: { usersArray: userId },
    $push: { messagesArray: message },
  };

  let room: any = await Room.findByIdAndUpdate(id, update, {
    returnOriginal: false,
  });
  if (room.usersArray.length == 0) {
    return Room.findByIdAndDelete(id);
  } else {
    return room;
  }
};

export { RoomType, RoomRootQuery, RoomMutation };
