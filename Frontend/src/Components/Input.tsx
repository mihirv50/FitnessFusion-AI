import type { HTMLInputTypeAttribute } from "react"

interface InputI {
    placeholder?: string,
    type?: HTMLInputTypeAttribute | undefined,
    ref?: any,
    onChange?: ()=>void,
    className?: string
}

const Input = (props: InputI) => {
  return (
    <>
      <input className={props.className} ref={props.ref} placeholder={props.placeholder}  type={props.type} />
    </>
  )
}

export default Input