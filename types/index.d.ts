import { Omit } from 'type-fest';
interface CookieOptions {
    path?: string;
    secure?: boolean;
    domain?: string;
    expires?: Date | number;
}
declare function setCookie(key: string, value: string, { expires, domain, secure, path }?: CookieOptions): string;
declare function getCookie(key: string): string | Array<string> | null;
declare function removeCookie(key: string, options: Omit<CookieOptions, 'expires' | 'secure'>): void;
export { setCookie, getCookie, removeCookie };
//# sourceMappingURL=index.d.ts.map