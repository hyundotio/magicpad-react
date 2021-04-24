import { KeyDownloadLinks } from "./KeysTypes";

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
