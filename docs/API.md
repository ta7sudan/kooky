## API

### `setCookie(key: string, value: string, options?: object)`

- `expires`, `Number` or `Date`, if `Number`, means after `expires` hours
- `domain`, default `''`
- `path`, default `'/'`
- `secure`, default `false`

returns a cookie string.



### `getCookie(key: string)`

returns the string value of cookie, if `Array`, means cookie of different `path` has same key, the first value is the cookie of current `path`.



### `removeCookie(key: string, options?: object)`

- `path`
- `domain`