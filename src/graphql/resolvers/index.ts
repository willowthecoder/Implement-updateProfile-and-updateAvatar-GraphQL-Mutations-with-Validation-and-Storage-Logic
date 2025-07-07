import { profileResolvers } from "./profileResolvers";
import { userResolvers } from "./userResolvers";

export const resolvers = {
  ...profileResolvers,
  ...userResolvers,
};
