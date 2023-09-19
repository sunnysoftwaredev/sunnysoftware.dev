export const getLocalCookieValue = ():
string | undefined => document.cookie
  .split('; ')
  .find(row => row.startsWith('authenticationToken='))
  ?.split('=')[1];

export const getErrorMessage = (e: unknown): string => {
  if (typeof e === 'string') {
    return e;
  }
  if (e instanceof Error) {
    return e.message;
  }
  return 'Unknown error';
};
