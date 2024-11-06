import { useState } from 'react'

export const useField = (name, type, testid) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const submit = () => {
    setValue('')
  }

  return {
    input: {
      name,
      type,
      value,
      onChange
    },
    testid,
    submit,
  }

}