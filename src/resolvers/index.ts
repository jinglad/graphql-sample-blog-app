import { Mutation } from "./Mutation/mutation";
import { Post } from "./post";
import { Profile } from "./profile";
import { Query } from "./Query/query";
import { User } from "./user";

export const resolvers = {
  Query,
  Mutation,
  Post,
  User,
  Profile,
};
