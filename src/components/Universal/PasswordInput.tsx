import React, { useState } from "react";

interface Props {
  setPasswordValue: Function;
}

const PasswordInput : React.FunctionComponent<Props> = props => {
  const [showPassword, setShowPassword] = useState(false);
  //const [passwordFillState, setPasswordFillState] = useState(false);

  function handleOnClick(e: React.FormEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    setShowPassword(input.checked);
  }

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    props.setPasswordValue(input.value);
  }

  return (
    <>
      <input type={showPassword ? "text" : "password"} onChange={handleOnChange} placeholder="Password" />
      <input type="checkbox" onClick={handleOnClick}/>
    </>
  )
}

export default PasswordInput;
