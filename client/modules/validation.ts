import * as R from 'ramda';

/* 같은 값 체크 */
export const equalCheck = (...args: any) =>{
  return R.equals(...args)
}