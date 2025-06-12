import { verify } from "../util/auth.util.js";

export const AUTHENTICATE = async (req, res, next) => {
  const user = await verify(req.headers);
  req.user = user;
  next();
};
