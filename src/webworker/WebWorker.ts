import { ProcessedData } from "../@types/ProcessedDataTypes";
import { GeneratedKeys, KeyForm } from "../@types/KeysTypes";
import { generateKey as openpgpGenerateKeys } from "openpgp";

export function encryptString(data: string, pw: string, sign: boolean): string {
  return data + ' encrypt';
}
export function decryptString(data: string, pw: string): string {
  return data + ' decrypt';
}
export function encryptAttachment(data: ProcessedData, pw: string): string {
  return data && 'encrypted attachment';
}
export function decryptAttachment(data: ProcessedData, pw: string): string {
  return data && 'decrypted attachment';
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
  const generatedKeys = await openpgpGenerateKeys(options);
  return {
    publicKey: generatedKeys.publicKeyArmored.trim(),
    privateKey: generatedKeys.privateKeyArmored.trim()
  }
}
