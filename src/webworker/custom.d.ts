declare module 'comlink-loader!*' {
  class WebpackWorker extends WebWorker {
    constructor();
    decryptData(data: string, pw: string): Promise<string>;
    encryptData(data: string, pw: string): Promise<string>;
    decryptAttachment(data: string | ArrayBuffer, pw: string): Promise<any>;
    encryptAttachment(data: string | ArrayBuffer, pw: string): Promise<any>;
  }
  export = WebpackWorker;
}
