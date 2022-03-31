import { BaseSyntheticEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormValues } from '../src/additional'

export const UsesForm = (
  callback: () => void,
  initialState: Partial<FormValues>
) => {
  const [formData, setFormData] = useState(initialState)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handlePictureChange = (event: BaseSyntheticEvent) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] })
  }
  const onSubmit: SubmitHandler<FormValues> = (input: FormValues) => callback()
  return {
    handleInputChange,
    handlePictureChange,
    onSubmit,
    formData
  }
}
