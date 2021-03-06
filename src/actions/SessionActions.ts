import { LoadPublicKey,
         LoadPrivateKey,
         SetAttachPageState,
         SetWritePageState,
         SetKeysPageState,
         SetKeysPagePasteState,
         SetKeysPageConvertState,
         SetKeysPageNewKeysState,
         KeysPagePasteState,
         KeysPageConvertState,
         KeysPageNewKeysState,
         SetReadPageState,
         ReadPageState,
         AttachPageState,
         WritePageState,
         KeysPageState,
         MainState,
         MainStateActionsTypes } from "../@types/StateTypes";
import {
         PublicKeyPackage,
         PrivateKeyPackage } from "../@types/KeysTypes";
import { ActionCreator } from "redux";

/*export const loadState: ActionCreator<LoadKeys> =
  () => {
    const cookieContents = {
      publicKey: 'LOADED PUB KEY',
      privateKey: 'LOADED PRIV KEY'
    }
    return ({type: KeysActionsTypes.LOADKEYS, keys: {...cookieContents}})
  }*/

export const loadPublicKey: ActionCreator<LoadPublicKey> =
  (publicKeyPackage: PublicKeyPackage) => ({type: MainStateActionsTypes.LOADPUBLICKEY, publicKeyPackage: publicKeyPackage});

export const loadPrivateKey: ActionCreator<LoadPrivateKey> =
  (privateKeyPackage: PrivateKeyPackage) => ({type:  MainStateActionsTypes.LOADPRIVATEKEY, privateKeyPackage: privateKeyPackage});

export const setAttachPageState: ActionCreator<SetAttachPageState> =
  (state: AttachPageState) => ({type: MainStateActionsTypes.SETATTACHPAGESTATE, state: state});

export const setWritePageState: ActionCreator<SetWritePageState> =
  (state: WritePageState) => ({type: MainStateActionsTypes.SETWRITEPAGESTATE, state: state});

export const setKeysPageState: ActionCreator<SetKeysPageState> =
  (state: KeysPageState) => ({type: MainStateActionsTypes.SETKEYSPAGESTATE, state: state});

export const setKeysPagePasteState: ActionCreator<SetKeysPagePasteState> =
  (state: KeysPagePasteState) => ({type: MainStateActionsTypes.SETKEYSPAGEPASTESTATE, state: state});

export const setKeysPageConvertState: ActionCreator<SetKeysPageConvertState> =
  (state: KeysPageConvertState) => ({type: MainStateActionsTypes.SETKEYSPAGECONVERTSTATE, state: state});

export const setKeysPageNewKeysState: ActionCreator<SetKeysPageNewKeysState> =
  (state: KeysPageNewKeysState) => ({type: MainStateActionsTypes.SETKEYSPAGENEWKEYSSTATE, state: state});

export const setReadPageState: ActionCreator<SetReadPageState> =
  (state: ReadPageState) => ({type: MainStateActionsTypes.SETREADPAGESTATE, state: state});
