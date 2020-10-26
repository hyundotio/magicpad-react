export interface Keys {
  publicKey: string;
  privateKey: string;
}

export enum KeysActionsTypes {
  LOADKEYS = "KEYS/LOADKEYS",
  SAVEKEYS = "KEYS/SAVEKEYS"
}

export interface LoadKeys {
  type: KeysActionsTypes.LOADKEYS;
  keys: Keys;
}

export interface SaveKeys {
  type: KeysActionsTypes.SAVEKEYS;
  keys: Keys;
}

export type KeysActions = LoadKeys | SaveKeys;

export interface KeysState {
  readonly keys: Keys;
}
