import { ProcessedData } from "../@types/ProcessedDataTypes";

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
