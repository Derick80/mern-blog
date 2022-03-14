import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

export type FormInputs = {
  username: string
  email: string
  password: string
  confirmPassword: string
  title: string
  content: string
  imageUrl?: string
  file: string
}

export const useForm = (
  callback: () => void,
  initialState: Partial<FormInputs>
) => {
  const [values, setValues] = useState(initialState)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    callback()
  }
  return {
    handleChange,
    handleSubmit,
    values
  }
}

export const UPLOAD_FILE_MUTATION = gql`
  mutation ($file: Upload!) {
    uploadFile(file: $file) {
      imageUrl
    }
  }
`

// if (loading) return <div>Loading...</div>
// if (error) return <div>{JSON.stringify(error, null, 2)}</div>
