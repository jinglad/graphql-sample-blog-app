import { userLoader } from "../dataLoaders/userLoader";

export const Post = {
  author: async (parent: any, args: any, { prisma }: any) => {
    console.log(parent.authorId, "parent");
    return userLoader.load(parent.authorId);
  },
};
