import { CookieSerializeOptions } from "cookie";

export type passwordsMap = { [id: string]: string };
export type password = string | passwordsMap;

export const fourteenDaysInSeconds = 15 * 24 * 3600;

export const defaultOptions: {
  ttl: number;
  cookieOptions: CookieSerializeOptions;
} = {
  ttl: fourteenDaysInSeconds,
  cookieOptions: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
};

export function normalizeStringPasswordToMap(password: password) {
  return typeof password === "string" ? { 1: password } : password;
}
