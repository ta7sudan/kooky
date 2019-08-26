/* global DEBUG */
const dec = decodeURIComponent,
	enc = encodeURIComponent,
	decode = (s: string): string => s.replace(/(%[0-9A-Z]{2})+/g, dec);

interface CookieOptions {
	path?: string;
	secure?: boolean;
	domain?: string;
	expires?: Date | number;
}

function setCookie(key: string, value: string, {expires, domain, secure, path = '/'}: CookieOptions = {} as CookieOptions): string {
	if (typeof value !== 'string') {
		// 这里是基本类型, 可以重新赋值
		// tslint:disable-next-line
		value = String(value);
	}
	// 这里是基本类型, 可以重新赋值
	// tslint:disable-next-line
	key = enc(
		key.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, dec)
	);
	// 这里是基本类型, 可以重新赋值
	// tslint:disable-next-line
	value = enc(
		value.replace(/%(23|24|26|2B|5E|60|7C)/g, dec).replace(/[\\]/g, escape)
	);
	let text = `${key}=${value}`;
	text += `; path=${path.split(';')[0]}`;
	// 这里是基本类型, 可以重新赋值
	// tslint:disable-next-line
	typeof expires === 'number' && (expires = new Date(Date.now() + expires * 36e5));
	// js中toUTCString和toGMTString是一样的
	// https://segmentfault.com/a/1190000006798626
	expires instanceof Date && (text += `; expires=${expires.toUTCString()}`);
	typeof domain === 'string' && (text += `; domain=${domain.split(';')[0]}`);
	secure && (text += '; secure');
	return (document.cookie = text);
}

function getCookie(key: string): string | Array<string> | null {
	const cookies = document.cookie ? document.cookie.split('; ') : [],
		rst: Array<string> = [];
	for (let i = 0, len = cookies.length; i < len; ++i) {
		const part = cookies[i].split('='),
			name = decode(part[0]),
			value = decode(part.slice(1).join('='));
		name === key && rst.push(value);
	}
	return rst.length ? (rst.length === 1 ? rst[0] : rst) : null;
}

function removeCookie(key: string, options: Omit<CookieOptions, 'expires' | 'secure'>): void {
	setCookie(key, '', {
		...options,
		expires: -1
	});
}

export { setCookie, getCookie, removeCookie };
