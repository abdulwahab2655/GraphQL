import User from '../models/User.js'
import { ApolloError } from 'apollo-server-errors';
import { isValidObjectId } from 'mongoose';

export const resolvers = {
  Query: {
     async getUser(_, args) { 
      try {
        if (!isValidObjectId(args.id)) {
          throw new ApolloError('Invalid user ID format', 'INVALID_ID_FORMAT');
        }

        const user = await User.findById(args.id);

        if (!user) {
          throw new ApolloError(`User not found with ID: ${args.id}`, 'USER_NOT_FOUND');
        }

        return user;
      } catch (error) {
        if (error instanceof ApolloError) {
          throw error;
        } else {
          console.error('Unexpected error in getUser resolver:', error);
          throw new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
        }
      }
    },

    async getAllUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error('Unexpected error in getAllUsers resolver:', error);
        throw new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
      }
    },
  },

  Mutation: {
    async createUser(_, { newUser }) {
      try {
        // Validate input
        if (!newUser.email || !newUser.name || !newUser.password) {
          throw new ApolloError(
            'Missing required fields',
            'MISSING_REQUIRED_FIELDS'
          );
        }

        const createdUser = await User.create(newUser);
        return createdUser;
      } catch (error) {
        console.error('Unexpected error in createUser resolver:', error);
        throw new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
      }
    },
   async updateUser(_, { id, editUser }) {
  try {
    if (!isValidObjectId(id)) {
      throw new ApolloError('Invalid user ID format', 'INVALID_ID_FORMAT');
    }

    const updatedUser = await User.findOneAndUpdate({ _id: id }, editUser, {
      new: true,
    });


    if (!updatedUser) {
      throw new ApolloError(`User not found with ID: ${id}`, 'USER_NOT_FOUND');
    }

    console.log('Updated User:', updatedUser);

    return updatedUser;
  } catch (error) {
    if (error instanceof ApolloError) {
      throw error;
    } else {
      console.error('Unexpected error in updateUser resolver:', error);
      throw new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
    }
  }
},

    async deleteUser(_, { id }) {
      try {
        if (!isValidObjectId(id)) {
          throw new ApolloError('Invalid user ID format', 'INVALID_ID_FORMAT');
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
          throw new ApolloError(
            `User not found with ID: ${id}`,
            'USER_NOT_FOUND'
          );
        }

        return deletedUser;
      } catch (error) {
        if (error instanceof ApolloError) {
          throw error;
        } else {
          console.error('Unexpected error in deleteUser resolver:', error);
          throw new ApolloError(
            'Internal server error',
            'INTERNAL_SERVER_ERROR'
          );
        }
      }
    },
  },
};
