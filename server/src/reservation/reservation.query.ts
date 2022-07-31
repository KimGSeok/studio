/* 예약목록 조회 */
const getReservationList = (keyword: string, category:string, status: string, space: string, date: string, begin: number, pageSize: number) =>{

  // TODO 검색조건이 추가되면 변경
  const orderCondition = category === 'all' ? 'name LIKE ?' : 'name LIKE ?';
  const statusCondition = status ? `AND status = ?` : '';
  const spaceCondition = space ? `AND space = ?` : '';
  const dateCondition = date ? 'AND start_date <= ? AND end_date >= ?' : '';

  const query = `
    SELECT SQL_CALC_FOUND_ROWS
      id,
      title,
      space,
      room,
      status,
      name,
      view,
      DATE_FORMAT(start_date, '%Y-%m-%d %H:%m:%s') AS start_date,
      DATE_FORMAT(end_date, '%Y-%m-%d %H:%m:%s') AS end_date,
      DATE_FORMAT(start_date, '%Y-%m-%d 00:00:00') AS reservation_start_date,
      DATE_FORMAT(start_date, '%Y-%m-%d') AS reservation_start_date_day,
      DATE_FORMAT(start_date, '%H:%i:%s') AS reservation_start_date_time,
      DATE_FORMAT(end_date, '%Y-%m-%d 00:00:00') AS reservation_end_date,
      DATE_FORMAT(end_date, '%Y-%m-%d') AS reservation_end_date_day,
      DATE_FORMAT(end_date, '%H:%i:%s') AS reservation_end_date_time,
      TIMESTAMPDIFF(hour ,DATE_FORMAT(create_time, '%Y-%m-%d %H:%m:%s'), NOW()) AS is_over_hour,
      DATE_FORMAT(create_time, '%Y-%m-%d %H:%m:%s') AS create_time,
      DATE_FORMAT(recent_update_time, '%Y-%m-%d %H:%m:%s') AS recent_update_time
    FROM
      reservation
    WHERE
      ${orderCondition}
      ${statusCondition}
      ${spaceCondition}
      ${dateCondition}
    ORDER BY
      id DESC
    LIMIT ?, ?;

    SELECT FOUND_ROWS() AS rowCount;
  `;
  let params: any = [ keyword, status, space, date, date, begin, pageSize ];
  params = params.filter(function(e: any){ return e === 0 || e });
  return { query, params };
}

/* 예약하기 */
const doReservation = (title: string, space:string, room: string, name: string, password: string, content: string, startDate: string, endDate: string, salt: string, reservationStatus: string) =>{
  const query = `
    INSERT INTO
      reservation
      (
        title,
        space,
        room,
        name,
        password,
        content,
        start_date,
        end_date,
        salt,
        view,
        status,
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
        ?,
        ?,
        ?,
        ?,
        1,
        ?,
        NOW(),
        NOW()
      )
  `;

  let params = [ title, space, room, name, password, content, startDate, endDate, salt, reservationStatus ];
  params = params.filter(function(e){ return e });
  return { query, params };
}

/* 예약 상세정보 조회 */
const getReservationDetail = (reservationId: number) => {
  const query = `
    SELECT
      id,
      title,
      space,
      room,
      name,
      status,
      password,
      content,
      DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date,
      DATE_FORMAT(start_date, '%H:00') AS start_time,
      DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,
      DATE_FORMAT(end_date, '%H:00') AS end_time,
      view,
      salt,
      DATE_FORMAT(create_time, '%Y-%m-%d %H:%m:%s') AS create_time,
      DATE_FORMAT(recent_update_time, '%Y-%m-%d %H:%m:%s') AS recent_update_time
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

/* 예약상태 변경 */
const changeReservationStatus = (reservationStatus: string, id: number) =>{
  const query = `
    UPDATE
      reservation
    SET
      status = ?
    WHERE
      id = ?
  `
  let params = [ reservationStatus, id ];
  params = params.filter(function(e){ return e });
  return { query, params };
}

/* 예약 수정하기 */
const modifyReservation = (title: string, space:string, room: string, name: string, password: string, content: string, startDate: string, endDate: string, salt: string, id: number) =>{
  const query = `
    UPDATE
      reservation
    SET
      title = ?,
      space = ?,
      room = ?,
      name = ?,
      password = ?,
      content = ?,
      start_date = ?,
      end_date = ?,
      salt = ?,
      recent_update_time = NOW()
    WHERE
      id = ?
  `
  let params = [ title, space, room, name, password, content, startDate, endDate, salt, id ];
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
  changeReservationStatus,
  modifyReservation,
  deleteReservation
}