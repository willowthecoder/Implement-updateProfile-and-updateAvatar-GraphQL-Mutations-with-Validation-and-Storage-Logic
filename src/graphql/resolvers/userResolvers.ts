import { User, IUser } from '../../models/User';
import { logger } from '../../utils/logger';

interface Context {
  user?: {
    sub: string;
  };
}

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const user = await User.findOne({ auth0Id: context.user.sub });
        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        logger.error('Error in me resolver:', error);
        throw error;
      }
    },
    users: async (_: any, __: any, context: Context) => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        logger.error('Error in users resolver:', error);
        throw error;
      }
    },
  },

  Mutation: {
    updateProfile: async (_: any, args: Partial<IUser>, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const user = await User.findOneAndUpdate(
          { auth0Id: context.user.sub },
          { $set: args },
          { new: true }
        );

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        logger.error('Error in updateProfile resolver:', error);
        throw error;
      }
    },
  },
}; 