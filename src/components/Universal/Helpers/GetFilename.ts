export function getFilename(str:string): string{
  const filename = str.split(/(\\|\/)/g).pop();
	return filename ? filename : ''
}
