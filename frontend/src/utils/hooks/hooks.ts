import React, { useState } from 'react'

export type FormInputs = {
  username: string
  email: string
  password: string
  confirmPassword: string
  title: string
  content: string
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
