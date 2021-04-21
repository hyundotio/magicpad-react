declare module 'comlink-loader!*' {
  import { ProcessedData, DecryptedResult } from "../@types/ProcessedDataTypes";
  import { StegInput } from "../@types/StegTypes";
  import { GeneratedKeys, KeyForm } from "../@types/KeysTypes";

  class WebpackWorker extends WebWorker {
    constructor();
    decryptString(data: string, pw: string, publicKey: string, privateKey: string): Promise<DecryptedResult>;
    encryptString(data: string, pw: string, sign: boolean, publicKey: string, privateKey: string): Promise<string>;
    decryptAttachment(data: ProcessedData, pw: string, publicKey: string): Promise<ProcessedData>;
    encryptAttachment(data: ProcessedData, pw: string, privateKey: string): Promise<ProcessedData>;
    generateKeys(form: KeyForm): Promise<GeneratedKeys>;
  }
  export = WebpackWorker;
}
