export interface Keys {
  publicKey: string;
  privateKey: string;
  publicFingerprint: string;
  privateFingerprint: string;
}

export interface GeneratedKeys {
  publicKey: string;
  privateKey: string;
  [key: string]: string;
}

export interface KeyDownloadLinks {
  publicKey: string;
  privateKey: string;
  publicKeySteg: string;
  privateKeySteg: string;
}

export interface KeyForm {
  name: string;
  email: string;
  password: string;
}
