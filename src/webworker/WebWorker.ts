import { ProcessedData, DecryptedResult } from "../@types/ProcessedDataTypes";
import { GeneratedKeys, KeyForm, Keys } from "../@types/KeysTypes";
import * as openpgp from "openpgp";

interface Props {
  loadedKeys: Keys;
}

export async function encryptString(data: string, pw: string, sign: boolean, publicKey: string, privateKey: string): Promise<string> {
  let encryptedText = "";
  const clearMessage = await openpgp.message.fromText(data);
  const publicKeyRead = (await openpgp.key.readArmored(publicKey)).keys[0];
  if(privateKey && sign){
    const privateKeyRead = (await openpgp.key.readArmored(privateKey)).keys[0];
    await privateKeyRead.decrypt(pw);
    const signedText = await openpgp.sign({message: clearMessage, privateKeys: [privateKeyRead]});
    const signedMsg = await openpgp.message.fromText(signedText.data);
    const cipherText = await openpgp.encrypt({message: signedMsg, publicKeys: [publicKeyRead]});
    encryptedText = cipherText.data;
  } else {
    const cipherText = await openpgp.encrypt({message: clearMessage, publicKeys: [publicKeyRead]});
    encryptedText = cipherText.data;
  }
  return encryptedText
}

export async function decryptString(data: string, pw: string, publicKey: string, privateKey: string): Promise<DecryptedResult> {
  let result: DecryptedResult = {
    decryptedMessage: "",
    verificationMessage: "Message decrypted. Signature not valid."
  }
  const publicKeyRead = (await openpgp.key.readArmored(publicKey)).keys[0];
  const privateKeyRead = (await openpgp.key.readArmored(privateKey)).keys[0];
  await privateKeyRead.decrypt(pw);
  const encryptedMessage = await openpgp.message.readArmored(data);
  const decryptedMessage = await openpgp.decrypt({message: encryptedMessage, publicKeys:[publicKeyRead], privateKeys:[privateKeyRead]});
  result.decryptedMessage = decryptedMessage.data;
  if(decryptedMessage.data.search('-----BEGIN PGP SIGNATURE-----') !== -1){
    const signedMessage = await openpgp.cleartext.readArmored(decryptedMessage.data);
		const verifiedMessage = await openpgp.verify({message: signedMessage, publicKeys: [publicKeyRead]});
		if (verifiedMessage.signatures?.length && verifiedMessage.signatures[0].valid) {
			result.verificationMessage = "Message decrypted. Signature valid.";
		}
  }
  return result
}

export async function encryptAttachment(data: ArrayBuffer, pw: string, publicKey: string): Promise<string> {
  const arrayBufferContent = await openpgp.message.fromBinary(new Uint8Array(data));
  const publicKeyRead = (await openpgp.key.readArmored(publicKey)).keys[0];
  const encryptedAttachment = await openpgp.encrypt({message: arrayBufferContent, publicKeys:[publicKeyRead]});
  return encryptedAttachment.data
}

export async function decryptAttachment(data: string, pw: string, privateKey: string): Promise<string> {
  const privateKeyRead = (await openpgp.key.readArmored(privateKey)).keys[0];
  await privateKeyRead.decrypt(pw);
  const encryptedAttachment = await openpgp.message.readArmored(data);
  const decryptedAttachment = await openpgp.decrypt({message: encryptedAttachment, privateKeys:[privateKeyRead]});
  return decryptedAttachment.data
}

export async function generateKeys(form: KeyForm): Promise<GeneratedKeys> {
  const options = {
		userIds: [{
			name: form.name,
			email: form.email
		}],
		numBits: 4096,
		passphrase: form.password
	}
  const generatedKeys = await openpgp.generateKey(options);
  return {
    publicKey: generatedKeys.publicKeyArmored.trim(),
    privateKey: generatedKeys.privateKeyArmored.trim()
  }
}
