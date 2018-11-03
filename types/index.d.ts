export function setCookie(key: string, value: string, options?: {
	expires?: number | Date,
	domain?: string,
	path?: string,
	secure?: boolean
}): string;

export function getCookie(key: string): string | Array;

export function removeCookie(key: string, options?: {
	path?: string,
	domain?: string
}): void;
