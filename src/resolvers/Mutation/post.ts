import { checkUserAccess } from "../../utils/checkUserAccess";

const createPost = async (
  parent: any,
  { title, content }: { title: string; content: string },
  { prisma, userInfo }: any
) => {
  if (!userInfo) {
    return {
      userError: "Unauthorized",
      post: null,
    };
  }

  if (!title || !content) {
    return {
      userError: "Title and content are required",
      post: null,
    };
  }

  const newPost = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: userInfo.userId,
    },
  });

  return {
    postError: null,
    post: newPost,
  };
};

const updatePost = async (
  parent: any,
  args: any,
  { prisma, userInfo }: any
) => {
  const { postId, post } = args;

  if (!userInfo) {
    return {
      userError: "Unauthorized",
      post: null,
    };
  }

  const error = await checkUserAccess(prisma, userInfo.userId, postId);
  if (error) {
    return error;
  }

  const updatedPost = await prisma.post.update({
    where: { id: Number(postId) },
    data: post,
  });

  return {
    userError: null,
    post: updatedPost,
  };
};

const deletePost = async (
  parent: any,
  args: any,
  { prisma, userInfo }: any
) => {
  console.log(args);
  if (!userInfo) {
    return {
      userError: "Unauthorized",
      post: null,
    };
  }

  const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
  if (error) {
    console.log(error, "error");
    return error;
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id: Number(args.postId),
    },
  });

  return {
    userError: null,
    post: deletedPost,
  };
};

const publishPost = async (
  parent: any,
  args: any,
  { prisma, userInfo }: any
) => {
  if (!userInfo) {
    return {
      userError: "Unauthorized",
      post: null,
    };
  }

  const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
  if (error) {
    return error;
  }

  const publishedPost = await prisma.post.update({
    where: { id: Number(args.postId) },
    data: { published: true },
  });

  return {
    userError: null,
    post: publishedPost,
  };
};

export const postResolvers = {
  createPost,
  updatePost,
  deletePost,
  publishPost,
};
