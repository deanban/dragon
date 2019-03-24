import { ACCOUNT_DRAGONS } from './types';
import { fetchAccountType } from './accountAction';

export const fetchAccountDragons = () => fetchAccountType({
  endpoint: 'dragons',
  opts: { credentials: 'include' },
  LOADING_TYPE1: ACCOUNT_DRAGONS.LOADING_ACCOUNT_DRAGONS,
  LOADING_TYPE2: ACCOUNT_DRAGONS.ACCOUNT_DRAGONS_LOADED,
  ERROR_TYPE: ACCOUNT_DRAGONS.ACCOUNT_DRAGON_ERROR,
  SUCCESS_TYPE: ACCOUNT_DRAGONS.FETCH_ACCOUNT_DRAGON_SUCCESS
});
