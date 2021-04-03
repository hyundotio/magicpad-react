export function isPrivateKey(key: string) {
  return key.search('-----END PGP PRIVATE KEY BLOCK-----') !== -1 && key.search('-----BEGIN PGP PRIVATE KEY BLOCK-----') !== -1
}

export function isPublicKey(key: string) {
  return key.search('-----END PGP PUBLIC KEY BLOCK-----') !== -1 && key.search('-----BEGIN PGP PUBLIC KEY BLOCK-----') !== -1
}
