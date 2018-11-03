/* global DEBUG */
const dec = decodeURIComponent,
	enc = encodeURIComponent,
	decode = s => s.replace(/(%[0-9A-Z]{2})+/g, dec);

function setCookie(key, value, {expires, domain, secure, path = '/'} = {}) {
	key = enc(
		key.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, dec)
	);
	value = enc(
		value.replace(/%(23|24|26|2B|5E|60|7C)/g, dec).replace(/[\\]/g, escape)
	);
	let text = `${key}=${value}`;
	text += `; path=${path.split(';')[0]}`;
	typeof expires === 'number' && (expires = new Date(Date.now() + expires * 36e5));
	// js中toUTCString和toGMTString是一样的
	// https://segmentfault.com/a/1190000006798626
	expires instanceof Date && (text += `; expires=${expires.toUTCString()}`);
	typeof domain === 'string' && (text += `; domain=${domain.split(';')[0]}`);
	secure && (text += '; secure');
	return (document.cookie = text);
}

function getCookie(key) {
	const cookies = document.cookie ? document.cookie.split('; ') : [],
		rst = [];
	for (var i = 0, len = cookies.length; i < len; ++i) {
		var part = cookies[i].split('='),
			name = decode(part[0]),
			value = decode(part.slice(1).join('='));
		name === key && rst.push(value);
	}
	return rst.length ? (rst.length === 1 ? rst[0] : rst) : null;
}

function removeCookie(key, options) {
	setCookie(key, {
		...options,
		expires: -1
	});
}

export {setCookie, getCookie, removeCookie};
