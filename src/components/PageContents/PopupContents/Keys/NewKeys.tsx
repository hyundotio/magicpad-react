import React, { useState, useEffect } from "react";
import PasswordInput from "../../../Universal/PasswordInput";
import WebWorker from "../../../../webworker";
import { validateEmail } from "../../../Universal/Helpers/EmailValidator";

const PopupContentsKeysNewKeys : React.FunctionComponent = () => {
  //Reducer, set private Key (owner);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const [formIsReady, setFormIsReady] = useState(false);
  const pgpWebWorker = new WebWorker();

  useEffect(() => {
      if(validateEmail(emailValue) && nameValue.trim().length && passwordValue.trim().length){
        setFormIsReady(true);
      } else {
        setFormIsReady(false);
      }
  }, [nameValue, emailValue, passwordValue]);

  async function handleEncrypt() {
    setIsWorking(true);
    const keyForm = {
      name: nameValue,
      email: emailValue,
      password: passwordValue
    }
    const generatedKeys = await pgpWebWorker.generateKeys(keyForm);
    setIsWorking(false);
    console.log(generatedKeys);
  }

  return (
    <div className="popup-content keys-new-keys">
      New keys
      <input type="text" placeholder="Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameValue(e.target.value)} />
      <input type="email" placeholder="E-mail" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailValue(e.target.value)} />
      <PasswordInput setPasswordValue={(input: string) => setPasswordValue(input)} />
      <button disabled={!formIsReady || isWorking} onClick={handleEncrypt}>Generate keys</button>
    </div>
  )
}

export default PopupContentsKeysNewKeys;
