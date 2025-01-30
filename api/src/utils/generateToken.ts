import jwt from "jsonwebtoken";

import { IUser } from "../models/user.model";

export const generateToken = (user: IUser) => {
  return jwt.sign({ userId: user?._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
