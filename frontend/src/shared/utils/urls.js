/* c8 ignore next 4 */
export const getApiUrl = () => {
  const url = import.meta.env.VITE_RESERVATION_API;
  if (!url) throw new Error('VITE_RESERVATION_API is not set');
  return url;
};
