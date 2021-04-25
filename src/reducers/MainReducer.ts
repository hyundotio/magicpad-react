import { Reducer } from "redux";
import { MainState, MainStateActions, MainStateActionsTypes } from "../@types/StateTypes";
import { Keys } from "../@types/KeysTypes";

const InitialAppState: MainState = {
  keys: {
    publicKey: '',
    privateKey: '',
    publicKeyFingerprint: '',
    privateKeyFingerprint: ''
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
    downloadUrl: '#',
    attachFilename: '',
    fileSize: ''
  }
}

export const MainReducer: Reducer <MainState, MainStateActions> =
             (state = InitialAppState, action) => {
  switch(action.type) {
    case MainStateActionsTypes.LOADPUBLICKEY: {
      let newState = {...state};
      newState.keys.publicKey = action.publicKeyPackage.publicKey;
      newState.keys.publicKeyFingerprint = action.publicKeyPackage.publicKeyFingerprint;
      return newState
    }
    case MainStateActionsTypes.LOADPRIVATEKEY: {
      let newState = {...state};
      newState.keys.privateKey = action.privateKeyPackage.privateKey;
      newState.keys.privateKeyFingerprint = action.privateKeyPackage.privateKeyFingerprint
      return newState;
    }
    case MainStateActionsTypes.SETATTACHPAGESTATE: {
      let newState = {...state};
      newState.attachPage = action.state;
      return newState;
    }
    case MainStateActionsTypes.SETWRITEPAGESTATE: {
      let newState = {...state};
      newState.writePage = action.state;
      return newState;
    }
    case MainStateActionsTypes.SETREADPAGESTATE: {
      let newState = {...state};
      newState.readPage = action.state;
      return newState;
    }
    case MainStateActionsTypes.SETKEYSPAGESTATE: {
      let newState = {...state};
      newState.keysPage.main = action.state;
      return newState;
    }
    case MainStateActionsTypes.SETKEYSPAGEPASTESTATE: {
      let newState = {...state};
      newState.keysPage.paste = action.state;
      return newState;
    }
    case MainStateActionsTypes.SETKEYSPAGECONVERTSTATE: {
      let newState = {...state};
      newState.keysPage.convert = action.state;
      return newState;
    }
    case MainStateActionsTypes.SETKEYSPAGENEWKEYSSTATE: {
      let newState = {...state};
      newState.keysPage.newKeys = action.state;
      return newState;
    }
    default:
      return state
  }
}
