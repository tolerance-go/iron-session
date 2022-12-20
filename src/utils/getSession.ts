import { unsealData } from "iron-session";
import { IronSessionData, IronSessionOptions } from "../core";
import cookie from "cookie";
import { defaultOptions, normalizeStringPasswordToMap } from "./utils";

export const getSession = async (
  cookieText: string,
  userSessionOptions: IronSessionOptions,
) => {
  const options: Required<IronSessionOptions> = {
    ...defaultOptions,
    ...userSessionOptions,
    cookieOptions: {
      ...defaultOptions.cookieOptions,
      ...(userSessionOptions.cookieOptions || {}),
    },
  };

  const sealFromCookies = cookie.parse(cookieText)[options.cookieName];

  const passwordsAsMap = normalizeStringPasswordToMap(
    userSessionOptions.password,
  );

  const session =
    sealFromCookies === undefined
      ? {}
      : await unsealData<IronSessionData>(sealFromCookies, {
          password: passwordsAsMap,
          ttl: options.ttl,
        });
  return session;
};
