import jwt from "jsonwebtoken";
import { appConfig } from "../config";

const generateToken = async (payload: { userId: number }) => {
  const token = jwt.sign(payload, process.env.APP_SECRET!, {
    expiresIn: "1d",
  });

  return token;
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.APP_SECRET!) as {
      userId: number;
    };

    return userData;
  } catch (err) {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
