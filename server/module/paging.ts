/*
  page: 현재 페이지
  totalCount: 전체 갯수
  pageSize: 한 페이지당 노출 페이지 
*/
export const pagination = (page: number, totalCount : number, pageSize : number) =>{

  // Parameter
  let totalPage = Math.ceil(totalCount / pageSize); // 총 페이지(올림 함수)
  let startPage = Math.floor((page - 1) / pageSize) * pageSize + 1; // 시작 페이지(내림 함수)
  let endPage = startPage + (pageSize - 1) // 마지막 페이지

  if(endPage > totalPage)
    endPage = totalPage; // 전체 페이지 숫자가 마지막 페이지보다 작으면, 전체 페이지 숫자를 마지막 페이지로

  let max = totalCount - ((page - 1) * pageSize);

  return{
    page: page,
    pageSize: pageSize,
    startPage: startPage,
    endPage: endPage,
    totalPage: totalPage,
    totalCount: totalCount,
    max: max
  }
}