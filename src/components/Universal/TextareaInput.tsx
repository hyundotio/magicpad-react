import React, {useState} from "react";

interface Props {
  setTextareaValue: Function;
}

const TextareaInput : React.FunctionComponent<Props> = props => {

  function handleOnChange(e: React.FormEvent<HTMLTextAreaElement>) {
    const input = e.target as HTMLTextAreaElement;
    props.setTextareaValue(input.value);
  }

  return (
    <textarea onChange={handleOnChange} placeholder={"Text here"}></textarea>
  )
}

export default TextareaInput;
