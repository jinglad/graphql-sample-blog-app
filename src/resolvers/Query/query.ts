interface PostArgs {
  title: string;
  content: string;
  published: boolean;
  authorId: number;
}

export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  profile: async (parent: any, args: { id: number }, { prisma }: any) => {
    return await prisma.profile.findUnique({
      where: { userId: Number(args.id) },
    });
  },
  posts: async (parent: any, args: PostArgs, { prisma }: any) => {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  myProfile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return null;
    }

    console.log(typeof userInfo.userId, "userInfo");

    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
};
