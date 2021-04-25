export interface Keys {
  publicKey: string;
  privateKey: string;
  publicKeyFingerprint: string;
  privateKeyFingerprint: string;
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

export interface PublicKeyPackage {
  publicKey: string;
  publicKeyFingerprint: string;
}

export interface PrivateKeyPackage {
  privateKey: string;
  privateKeyFingerprint: string;
}
