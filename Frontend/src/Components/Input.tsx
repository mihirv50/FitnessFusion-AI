import type { HTMLInputTypeAttribute } from "react"
import type {  UseFormRegister, Path, FieldValues } from "react-hook-form"


interface InputProps<T extends FieldValues> {
    placeholder?: string,
    type?: HTMLInputTypeAttribute | undefined,
    name: Path<T>
    className?: string,
    register: UseFormRegister<T>
}

const Input = <T extends FieldValues>({ placeholder, type, className, name, register }: InputProps<T>) => {
  return (
    <>
      <input {...register(name)} className={className} placeholder={placeholder}  type={type} />
    </>
  )
}

export default Input