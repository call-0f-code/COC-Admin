let setTokenFn: ((token: string | null) => void) | null = null;
let logoutFn: (() => void) | null = null;
let getTokenFn: (() => string | null) | null = null;
let setAdminUserFn: ((user: AdminUser | null) => void) | null = null;

export const AuthBridge = {
  register({
    setToken,
    logout,
    getToken,
    setAdminUser,
  }: {
    setToken: (token: string | null) => void;
    logout: () => void;
    getToken: () => string | null;
    setAdminUser: (user: AdminUser | null) => void;
  }) {
    setTokenFn = setToken;
    logoutFn = logout;
    getTokenFn = getToken;
    setAdminUserFn = setAdminUser;
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

  setAdminUser(user: AdminUser | null) {
    setAdminUserFn?.(user);
  },
};
