import * as R from 'ramda';

/* 같은 값 체크 */
export const equalCheck = (...args: any) =>{
  return R.equals(...args)
}

/* 글자 마스킹 처리 */
export const masking = (strName: string) =>{

  // 글자의 길이가 2이상일 때
  if(strName.length > 2){
    let originNameArr = strName.split('');

    originNameArr.forEach((name, index)=>{
      if (index === 0 || index === originNameArr.length - 1) return;
      originNameArr[index] = '*';
    })

    const maskingName = originNameArr.join();
    return maskingName.replace(/,/g, '');
  }else{
    return strName;
  }
}