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
