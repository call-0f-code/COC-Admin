let setTokenFn: ((token: string | null) => void) | null = null;
let logoutFn: (() => void) | null = null;
let getTokenFn: (() => string | null) | null = null;

export const AuthBridge = {
  register({
    setToken,
    logout,
    getToken,
  }: {
    setToken: (token: string | null) => void;
    logout: () => void;
    getToken: () => string | null;
  }) {
    setTokenFn = setToken;
    logoutFn = logout;
    getTokenFn = getToken;
  },

  setToken(token: string | null) {
    setTokenFn?.(token);
  },

  logout() {
    logoutFn?.();
  },

  getToken() {
    return getTokenFn ? getTokenFn() : null;
  },
};
