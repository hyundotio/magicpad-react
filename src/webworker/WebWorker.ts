import {ProcessedData} from "../@types/ProcessedDataTypes";

export function encryptData(data: string, pw: string): string {
  return data + ' encrypt';
}
export function decryptData(data: string, pw: string): string {
  return data + ' decrypt';
}
export function encryptAttachment(data: ProcessedData, pw: string): any {
  return data;
}
export function decryptAttachment(data: ProcessedData, pw: string): any {
  return data;
}
