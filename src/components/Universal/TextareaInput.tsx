import React from "react";

interface Props {
  setTextareaValue: Function;
  textareaValue: string;
}

const TextareaInput : React.FunctionComponent<Props> = props => {

  function handleOnChange(e: React.FormEvent<HTMLTextAreaElement>) {
    const input = e.target as HTMLTextAreaElement;
    props.setTextareaValue(input.value);
  }

  return (
    <textarea onChange={handleOnChange} placeholder={"Text here"} value={props.textareaValue}></textarea>
  )
}

export default TextareaInput;
