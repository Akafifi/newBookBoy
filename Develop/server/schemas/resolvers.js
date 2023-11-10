const { AuthenticationError } = require('apollo-server')
const { User } = require('../models')
const { GraphQLError } = require('graphql')
const { signToken } = require('../utils/auth')



module.exports = {
  Query: {
    getSingleUser: async (parent, { _id, username }, context, info) => {
      const foundUser = await User.find({
        $or: [{ _id }, { username}],
      });

      if (!foundUser) {
        throw new GraphQLError('Cannot find a user with this id!'), {
          extensions: {
            code: 'NO_USER_FOUND'
          }
        }
      }
      return foundUser;
    },

    Mutation: {
      createUser: async (parent, { user }, context, info) => {
        const newUser = await User.create(user);

        if (!newUser) {
          throw new GraphQLError('Something is wrong!', {
            extensions: {
              code: 'ERROR_CREATING_USER'
            }
          })
        }
        const token = signToken(newUser);
        return { token, user }

      },
      login: async (parent, { username, email, password }, context, info) => {
        const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      throw new GraphQLError("Can't find this user", {
        extensions: {
          code: 'LOGIN_ERROR'
        }
      })
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new GraphQLError("Wrong password", {
        extensions: {
          code: 'LOGIN_ERROR'
        }
      })
    }
    const token = signToken(user);
    res.json({ token, user });

      },
      saveBook: async (parent, { _id, book }, context, info) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return updatedUser
    } catch (err) {
      console.log(err);
      throw GraphQLError('Error saving book')
    }

      },
      deleteBook: async (parent, {_id, bookId }, context, info) => {
          const updatedUser = await User.findOneAndUpdate(
            { _id},
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          if (!updatedUser) {
            throw new GraphQLError("Couldn't find user with this id!", {
              extensions: {
                code: USER_NOT_FOUND
              }
            })
          }
          return updatedUser;

      },
    }


  },
},

  module.exports = resolvers