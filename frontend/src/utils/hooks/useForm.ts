import React, { useState } from 'react'

export type FormInputs = {
  username: string
  email: string
  password: string
  confirmPassword: string
  title: string
  content: string
  imageUrl: string
}

export const useForm = (
  callback: () => void,
  initialState: Partial<FormInputs>
) => {
  const [title, setTitle] = useState(initialState)
  const [content, setContent] = useState(initialState)
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle({ [event.target.name]: event.target.value })
    setContent({ [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    callback()
  }
  return {
    title,
    content,
    handleSubmit,
    handleFormChange
  }
}
