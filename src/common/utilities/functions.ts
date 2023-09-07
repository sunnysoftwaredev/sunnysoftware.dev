export const getLocalCookieValue = ():
string | undefined => document.cookie
  .split('; ')
  .find(row => row.startsWith('authenticationToken='))
  ?.split('=')[1];
