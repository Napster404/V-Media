import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { merge } from "lodash";

import {UserRootQuery, UserMutation} from "./userSchema"
import {PostRootQuery, PostMutation} from "./postSchema"
import {RoomRootQuery, RoomMutation} from "./roomSchema"

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: merge(UserRootQuery, PostRootQuery, RoomRootQuery),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: merge(UserMutation, PostMutation, RoomMutation),
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
