import { Keys, KeyDownloadLinks } from "./KeysTypes";

export interface WritePageState {
  signMessage: boolean;
  textareaValue: string;
  processedStegLink: string;
}

export interface ReadPageState {
  textareaValue: string;
  verificationMessage: string;
}

export interface KeysPageState {
  publicKeyFingerprint: string;
  privateKeyFingerprint: string;
  publicKeyFilename: string;
  privateKeyFilename: string;
}

export interface AttachPageState {
  attachType: string;
  downloadUrl: string;
}

export interface KeysPageConvertState {
  textareaValue: string;
  convertedKeyDownloadLink: string;
  convertedFilename: string;
}

export interface KeysPagePasteState {
  textareaValue: string;
}

export interface KeysPageNewKeysState {
  nameValue: string,
  emailValue: string,
  filenameValue: string,
  downloadLinks: KeyDownloadLinks,
  importKeyWithDownload: boolean
}

export enum MainStateActionsTypes {
  LOADPRIVATEKEY = "MAINSTATE/LOADPRIVATEKEY",
  LOADPUBLICKEY = "MAINSTATE/LOADPUBLICKEY",
  SETATTACHPAGESTATE = "MAINSTATE/SETATTACHPAGESTATE"
}

export interface SetAttachPageState {
  type: MainStateActionsTypes.SETATTACHPAGESTATE;
  state: AttachPageState;
}

export interface LoadPublicKey {
  type: MainStateActionsTypes.LOADPUBLICKEY;
  publicKey: string;
}

export interface LoadPrivateKey {
  type: MainStateActionsTypes.LOADPRIVATEKEY;
  privateKey: string;
}

export type MainStateActions = LoadPublicKey | LoadPrivateKey | SetAttachPageState;

export interface MainState {
  readonly keys: Keys;
  readonly writePage: WritePageState;
  readonly readPage: ReadPageState;
  readonly keysPage: {
    main: KeysPageState;
    convert: KeysPageConvertState;
    paste: KeysPagePasteState;
    newKeys: KeysPageNewKeysState;
  };
  readonly attachPage: AttachPageState;
}
