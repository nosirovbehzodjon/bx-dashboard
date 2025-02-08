export const join = (root: string, subLink: string) => {
  return `${root}/${subLink}`.replace(/(\/){2,}/g, '/');
};
