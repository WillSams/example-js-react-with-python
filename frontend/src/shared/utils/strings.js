export const capitalizeFirstLetter = (string) => {
  if (!string) return undefined;
  return string.charAt(0).toUpperCase() + string.slice(1);
};
