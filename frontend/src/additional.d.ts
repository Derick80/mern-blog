export interface PostFeedProps {
  id: string
  title: string
  content: string
  username: string
  imageUrl: string
  author: string
}
export interface SinglePostProps {
  postId: string
}
export interface IAuth {
  login: () => void
  logout: () => void
  user
}

export interface CreatePostFormValues {
  picture: null
  title: string
  content: string
  name: string
}

export interface UpdatePostAndImageFormValues {
  picture?: null
  title: string
  content: string
  name: string
  imageUrl?: string
}
export type FormValues = {
  username: string
  email: string
  password: string
  confirmPassword: string
  title: string
  content: string
  imageUrl?: string
  file: string
  picture: null
  name: string
}
export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> = Partial<{
  mode: Mode
  reValidateMode: Mode
  defaultValues: UnpackNestedValue<DeepPartial<TFieldValues>>
  resolver: Resolver<TFieldValues, TContext>
  context: TContext
  shouldFocusError: boolean
  shouldUnregister: boolean
  criteriaMode: 'firstError' | 'all'
}>
