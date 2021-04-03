export interface Keys {
  publicKey: string;
  privateKey: string;
  publicFingerprint: string;
  privateFingerprint: string;
}

export enum KeysActionsTypes {
  LOADPRIVATEKEY = "KEYS/LOADPRIVATEKEY",
  LOADPUBLICKEY = "KEYS/LOADPUBLICKEY"
}

export interface LoadPublicKey {
  type: KeysActionsTypes.LOADPUBLICKEY;
  publicKey: string;
}

export interface LoadPrivateKey {
  type: KeysActionsTypes.LOADPRIVATEKEY;
  privateKey: string;
}

export type KeysActions = LoadPublicKey | LoadPrivateKey;

export interface KeysState {
  readonly keys: Keys;
}
