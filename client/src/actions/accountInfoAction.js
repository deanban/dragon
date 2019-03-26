import { fetchAccountType } from './accountAction';
import { ACCOUNT_INFO } from './types';

export const fetchAccountInfo = () => fetchAccountType({
  endpoint: 'info',
  opts: { credentials: 'include' },
  LOADING_TYPE1: ACCOUNT_INFO.LOADING_ACCOUNT_INFO,
  LOADING_TYPE2: ACCOUNT_INFO.ACCOUNT_INFO_LOADED,
  ERROR_TYPE: ACCOUNT_INFO.ACCOUNT_INFO_ERROR,
  SUCCESS_TYPE: ACCOUNT_INFO.FETCH_ACCOUNT_INFO_SUCCESS
});
