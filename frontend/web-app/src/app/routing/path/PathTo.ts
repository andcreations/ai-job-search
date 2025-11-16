export const PathTo: { [key: string]: Function } = {
  dflt:() => {
    return PathTo.chat();
  },

  chat: () => {
    return '/';
  },

  signIn: (to?: string) => {
    const toParam = to ? `?to=${to}`: '';
    return `/sign-in${toParam}`;
  },
}