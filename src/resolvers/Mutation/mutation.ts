import bcrypt from "bcrypt";

import { jwtHelper } from "../../utils/jwtHelper";
import { authResolvers } from "./auth";
import { postResolvers } from "./post";

export const Mutation = {
  ...authResolvers,
  ...postResolvers,
};
