export function encryptData(data: string, pw: string): string {
  return data + ' encrypt';
}
export function decryptData(data: string, pw: string): string {
  return data + ' decrypt';
}
export function encryptAttachment(data: string | ArrayBuffer, pw: string): any {
  return data;
}
export function decryptAttachment(data: string | ArrayBuffer, pw: string): any {
  return data;
}
