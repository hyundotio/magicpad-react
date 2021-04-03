declare module 'comlink-loader!*' {
  import { ProcessedData } from "../@types/ProcessedDataTypes";
  import { StegInput } from "../@types/StegTypes";

  class WebpackWorker extends WebWorker {
    constructor();
    decryptString(data: string, pw: string): Promise<string>;
    encryptString(data: string, pw: string, sign: boolean): Promise<string>;
    decryptAttachment(data: ProcessedData, pw: string): Promise<ProcessedData>;
    encryptAttachment(data: ProcessedData, pw: string): Promise<ProcessedData>;
  }
  export = WebpackWorker;
}
