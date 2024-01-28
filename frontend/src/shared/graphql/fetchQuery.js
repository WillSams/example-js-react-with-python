import { getBaseApi } from '../base';

const fetchQuery = async (query, variables = {}) =>
  await getBaseApi().post('/graphql', { query, variables, }, { mode: 'cors' });

export default fetchQuery;
