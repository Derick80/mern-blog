export const GET_USER_GALLERY = gql`
  {
    getUserImageGallery {
      createdAt
      id
      imageUrl
      imageUserId
      imageUserName
    }
  }
`
export const CREATE_GALLERY_ENTRY = gql`
  mutation CreateGalleryEntry($input: CreateGalleryEntry!) {
    createGalleryEntry(input: $input)
  }
`
export const ADD_POST_MUTATION = gql`
  mutation createPost($title: String!, $content: String!, $imageUrl: String!) {
    createPost(
      postInput: { title: $title, content: $content, imageUrl: $imageUrl }
    ) {
      id
      title
      author
      imageUrl
      content
      username
      createdAt
      likes {
        id
        likedBy
        createdAt
      }
    }
  }
`

export const UPLOAD_SINGLE_FILE_MUTATION = gql`
  mutation ($file: Upload!) {
    uploadFile(file: $file) {
      imageUrl
      filename
    }
  }
`
export const UPLOAD_FILE_MUTATION = gql`
  mutation createNewPost(
    $imageUrl: String!
    $username: String!
    $email: String!
    $author: String!
  ) {
    createNewPost(
      imageUrl: $imageUrl
      username: $username
      email: $email
      author: $author
    ) {
      imageUrl
      username
      email
      author
    }
  }
`
export const GET_DRAFTS = gql`
  {
    getDraftPosts {
      id
      title
      content
      imageUrl
      published
    }
  }
`
