export const formatStayDate = (dateString) => {
  if (!dateString) return undefined;

  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 10);

  return formattedDate;
};
