import { Reducer } from "redux";
import { MainState, MainStateActions, MainStateActionsTypes } from "../@types/StateTypes";
import { Keys } from "../@types/KeysTypes";

const InitialAppState: MainState = {
  keys: {
    publicKey: '',
    privateKey: '',
    publicFingerprint: '',
    privateFingerprint: ''
  },
  writePage: {
    signMessage: false,
    textareaValue: '',
    processedStegLink: '#'
  },
  readPage: {
    textareaValue: '',
    verificationMessage: ''
  },
  keysPage: {
    main: {
      publicKeyFilename: '',
      publicKeyFingerprint: '',
      privateKeyFilename: '',
      privateKeyFingerprint: ''
    },
    paste: {
      textareaValue: ''
    },
    convert: {
      textareaValue: '',
      convertedKeyDownloadLink: '#',
      convertedFilename: ''
    },
    newKeys: {
      nameValue: '',
      emailValue: '',
      filenameValue: '',
      downloadLinks: {
        publicKey: '#',
        privateKey: '#',
        publicKeySteg: '#',
        privateKeySteg: '#'
      },
      importKeyWithDownload: true
    }
  },
  attachPage: {
    attachType: '',
    downloadUrl: '#'
  }
}

export const MainReducer: Reducer <MainState, MainStateActions> =
             (state = InitialAppState, action) => {
  switch(action.type) {
    case MainStateActionsTypes.LOADPUBLICKEY: {
      let newState = {...state};
      newState.keys.publicKey = action.publicKey;
      return newState
    }
    case MainStateActionsTypes.LOADPRIVATEKEY: {
      let newState = {...state};
      newState.keys.privateKey = action.privateKey;
      return newState;
    }
    case MainStateActionsTypes.SETATTACHPAGESTATE: {
      let newState = {...state};
      newState.attachPage = action.state;
      return newState;
    }
    default:
      return state
  }
}
