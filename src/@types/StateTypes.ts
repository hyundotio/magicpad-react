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
  attachFilename: string;
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
  SETATTACHPAGESTATE = "MAINSTATE/SETATTACHPAGESTATE",
  SETWRITEPAGESTATE = "MAINSTATE/SETWRITEPAGESTATE",
  SETREADPAGESTATE = "MAINSTATE/SETREADPAGESTATE",
  SETKEYSPAGESTATE = "MAINSTATE/SETKEYSPAGESTATE",
  SETKEYSPAGEPASTESTATE = "MAINSTATE/SETKEYSPAGEPASTESTATE",
  SETKEYSPAGENEWKEYSSTATE = "MAINSTATE/SETKEYSPAGENEWKEYSSTATE",
  SETKEYSPAGECONVERTSTATE = "MAINSTATE/SETKEYSPAGECONVERTSTATE"
}

export interface SetAttachPageState {
  type: MainStateActionsTypes.SETATTACHPAGESTATE;
  state: AttachPageState;
}

export interface SetKeysPageState {
  type: MainStateActionsTypes.SETKEYSPAGESTATE;
  state: KeysPageState;
}

export interface SetKeysPagePasteState {
  type: MainStateActionsTypes.SETKEYSPAGEPASTESTATE;
  state: KeysPagePasteState;
}

export interface SetKeysPageConvertState {
  type: MainStateActionsTypes.SETKEYSPAGECONVERTSTATE;
  state: KeysPageConvertState;
}

export interface SetKeysPageNewKeysState {
  type: MainStateActionsTypes.SETKEYSPAGENEWKEYSSTATE;
  state: KeysPageNewKeysState;
}

export interface SetWritePageState {
  type: MainStateActionsTypes.SETWRITEPAGESTATE;
  state: WritePageState;
}

export interface SetReadPageState {
  type: MainStateActionsTypes.SETREADPAGESTATE;
  state: ReadPageState;
}

export interface LoadPublicKey {
  type: MainStateActionsTypes.LOADPUBLICKEY;
  publicKey: string;
}

export interface LoadPrivateKey {
  type: MainStateActionsTypes.LOADPRIVATEKEY;
  privateKey: string;
}

export type MainStateActions = LoadPublicKey | LoadPrivateKey | SetAttachPageState |
                               SetKeysPageState | SetWritePageState | SetReadPageState |
                               SetKeysPagePasteState | SetKeysPageConvertState | SetKeysPageNewKeysState;

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
