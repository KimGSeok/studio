/* 예약목록 조회 */
const getReservationList = (keyword: string, category:string, begin: number, pageSize: number) =>{

  // TODO 검색조건이 추가되면 변경
  const orderCondition = category === 'all' ? 'name LIKE ?' : 'name LIKE ?';
  const query = `
    SELECT SQL_CALC_FOUND_ROWS
      id,
      title,
      name,
      view,
      TIMESTAMPDIFF(hour ,create_time, NOW()) AS isOverHour,
      DATE_FORMAT(create_time, '%Y-%m-%d %h:%m:%s') AS create_time,
      DATE_FORMAT(recent_update_time, '%Y-%m-%d %h:%m:%s') AS recent_update_time
    FROM
      reservation
    WHERE
      ${orderCondition}
    ORDER BY
      id DESC
    LIMIT ?, ?;

    SELECT FOUND_ROWS() AS rowCount;
  `;
  let params: any = [ keyword, begin, pageSize ];
  params = params.filter(function(e: any){ return e === 0 || e });
  return { query, params };
}

/* 예약하기 */
const doReservation = (title: string, name: string, password: string, content: string, salt: string) =>{
  const query = `
    INSERT INTO
      reservation
      (
        title,
        name,
        password,
        content,
        salt,
        view,
        create_time,
        recent_update_time
      )
      VALUES
      (
        ?,
        ?,
        ?,
        ?,
        ?,
        1,
        NOW(),
        NOW()
      )
  `;

  let params = [ title, name, password, content, salt ];
  params = params.filter(function(e){ return e });
  return { query, params };
}

/* 예약 상세정보 조회 */
const getReservationDetail = (reservationId: number) => {

  const query = `
    SELECT SQL_CALC_FOUND_ROWS
      id,
      title,
      name,
      password,
      content,
      view,
      salt,
      DATE_FORMAT(create_time, '%Y-%m-%d %h:%m:%s') AS create_time,
      DATE_FORMAT(recent_update_time, '%Y-%m-%d %h:%m:%s') AS recent_update_time
    FROM
      reservation
    WHERE
      id = ?
  `;
  let params: any = [ reservationId ];
  params = params.filter(function(e: any){ return e === 0 || e });
  return { query, params };
}

/* 상세페이지 접근 시, 조회수 업데이트 */
const updateReserviatonViewCount = (id: number) =>{
  const query = `
    UPDATE
      reservation
    SET
      view = view + 1
    WHERE
      id = ?
  `
  let params = [ id ];
  params = params.filter(function(e){ return e });
  return { query, params };
}

/* 예약 수정하기 */
const modifyReservation = (title: string, name: string, password: string, content: string, salt: string, id: number) =>{
  const query = `
    UPDATE
      reservation
    SET
      title = ?,
      name = ?,
      password = ?,
      content = ?,
      salt = ?,
      recent_update_time = NOW()
    WHERE
      id = ?
  `
  let params = [ title, name, password, content, salt, id ];
  params = params.filter(function(e){ return e });
  return { query, params };
}

/* 예약 삭제하기 */
const deleteReservation = (id: number) =>{
  const query = `
    DELETE
    FROM
      reservation
    WHERE
      id = ?
  `
  let params = [ id ];
  params = params.filter(function(e){ return e });
  return { query, params };
}

module.exports = {
  getReservationList,
  doReservation,
  getReservationDetail,
  updateReserviatonViewCount,
  modifyReservation,
  deleteReservation
}