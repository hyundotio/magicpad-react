export const bufferToHex = function(buffer: ArrayBufferLike): string {
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}

export const styleFingerprintString = function(fingerprint: string): string {
  const fingerprintRegex = fingerprint.match(/.{1,4}/g);
  return fingerprintRegex !== null ? fingerprintRegex.join(' ').toUpperCase() : ''
}
