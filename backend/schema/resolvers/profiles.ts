import { GraphQLUpload } from 'graphql-upload'
import { storeUpload } from '../../config/utils/profileAndImageOperations'
const Profile = require('../../models/profileModel')
const checkAuth = require('../../middleware/check-auth')

module.exports = {
  Query: {
    async getProfiles() {
      try {
        const profiles = await Profile.find()
        return profiles
      } catch (errorr) {
        throw new Error('profile not found')
      }
    },
    async getUserProfile(_: any, args: any, context: any) {
      const { user } = checkAuth(context)

      const userId = user.id
      console.log({ userId })

      const profile = await Profile.find({ username: user.username })
      console.log(profile)

      return profile
    }
  },
  Upload: GraphQLUpload,
  Mutation: {
    createProfile: async (
      _: any,
      {
        profileInput: { location, avatarUrl, aboutMe, nickName }
      }: typeof Profile,
      context: any
    ) => {
      const { user } = checkAuth(context)
      const newProfile = new Profile({
        location: location,
        avatarUrl: avatarUrl,
        aboutMe: aboutMe,
        nickName: nickName,
        username: user.username,
        email: user.email,
        createdAt: new Date().toISOString(),
        userId: user.id
      })
      const profile = await newProfile.save()
      return profile
    },
    createProfileandImage: async (
      _: any,
      { input: { picture, name, aboutMe, location, nickName } }: any,
      context: any
    ) => {
      const { avatarUrl } = await processUpload(picture)
      const { user } = checkAuth(context)
      console.log(
        'profileandImage',
        avatarUrl,
        name,
        aboutMe,
        location,
        nickName
      )

      try {
        const newProfileandImage = new Profile({
          username: user.username,
          name: name,
          avatarUrl: avatarUrl,
          location: location,
          nickName: nickName,
          aboutMe: aboutMe,
          userId: user.id,
          email: user.email,
          createdAt: new Date().toISOString()
        })
        const profileAndImage = await newProfileandImage.save()
        console.log('profileandImage', profileAndImage)

        return profileAndImage
      } catch (err) {
        throw new Error('error saving profile')
      }
    },
    editUserProfile: async (
      _: any,
      { input: { picture, name, location, aboutMe, nickName, profileId } }: any,
      context: any
    ) => {
      const { user } = checkAuth(context)
      console.log({ profileId })

      try {
        if (picture) {
          const { avatarUrl } = await processUpload(picture)
          const updateProfile = await Profile.findByIdAndUpdate(profileId, {
            avatarUrl: avatarUrl,
            name,
            location,
            nickName,
            aboutMe
          })
          const profile = await updateProfile.save()
          return profile
        } else {
          const updateProfile = await Profile.findByIdAndUpdate(profileId, {
            name,
            nickName,
            username: user.username,
            location,
            aboutMe
          })
          const profile = await updateProfile.save()
          return profile
        }
      } catch (error) {
        throw new Error('error saving profile')
      }
    }
  }
}

const processUpload = async (upload: any) => {
  const { createReadStream, filename, context } = await upload

  const { avatarUrl, name } = await storeUpload(
    createReadStream,
    filename,
    context
  )
  return { avatarUrl, filename, name }
}
