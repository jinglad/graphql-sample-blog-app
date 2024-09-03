import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";

interface UserInfo {
  password: string;
  email: string;
  name: string;
  bio?: string;
}

const createUser = async (parent: any, args: UserInfo, { prisma }: any) => {
  console.log(args);

  const isExistingUser = await prisma.user.findFirst({
    where: { email: args.email },
  });

  if (isExistingUser) {
    return {
      userError: "User already exists",
      token: null,
    };
  }

  const hashedPassword = await bcrypt.hash(args.password, 12);
  args.password = hashedPassword;
  const newUser = await prisma.user.create({
    data: {
      email: args.email,
      name: args.name,
      password: args.password,
    },
  });

  if (args.bio) {
    await prisma.profile.create({
      data: {
        bio: args?.bio,
        userId: newUser.id,
      },
    });
  }

  const token = await jwtHelper.generateToken({ userId: newUser.id });

  return {
    token,
  };
};

const login = async (
  parent: any,
  args: { email: string; password: string },
  { prisma }: any
) => {
  const user = await prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    return {
      userError: "No user found",
      token: null,
    };
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    return {
      userError: "Invalid password",
      token: null,
    };
  }

  const token = await jwtHelper.generateToken({ userId: user.id });

  return {
    userError: null,
    token,
  };
};

export const authResolvers = {
  createUser,
  login,
};
