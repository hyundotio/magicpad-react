export function stringTruncator (input: string, len: number){
		return (input.length > len) ? input.substr(0, len-1) + '...' : input
}
