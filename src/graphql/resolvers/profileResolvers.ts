import { AuthenticationError } from "apollo-server-express";
import { ProfileService } from "../../services/ProfileService";
import { GraphQLUpload } from "graphql-upload";

export const profileResolvers = {
  Upload: GraphQLUpload,

  Query: {
    getProfile: async (_: any, __: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return await ProfileService.getProfile(user.sub);
    },
  },

  Mutation: {
    updateProfile: async (_: any, { input }: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return await ProfileService.updateProfile(user.sub, input);
    },

    updateAvatar: async (_: any, { file }: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return await ProfileService.updateAvatar(user.sub, file);
    },
  },
};
