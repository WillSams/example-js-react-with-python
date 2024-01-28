import moment from 'moment';
import numeral from 'numeral';

export const formatNumberAsMoney = (amount) => {
  if (!amount) return;
  return numeral(amount).format('$0,0.00');
};

export const formatStayDate = (dateString) => {
  if (!dateString) return;
  return moment(dateString).format('YYYY-MM-DD');
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
