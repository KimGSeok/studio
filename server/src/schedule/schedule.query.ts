/* 공간 예약정보 상세조회 */
const getReservationDetailInfo = (space: string) => {
  // const dateCondition = date ? 'AND start_date <= ? AND end_date >= ?' : '';
  const query = `
    SELECT
      RD.id,
      RD.reservation_id,
      SP.location,
      RV.name,
      SP.floor,
      SP.room,
      DATE_FORMAT(RD.start_date, '%Y-%m-%d %H:%m:%s') AS start_date,
      DATE_FORMAT(RD.end_date, '%Y-%m-%d %H:%m:%s') AS end_date,
      DATE_FORMAT(RD.start_date, '%Y-%m-%d 00:00:00') AS reservation_start_date,
      DATE_FORMAT(RD.start_date, '%Y-%m-%d') AS reservation_start_date_day,
      DATE_FORMAT(RD.start_date, '%H') AS reservation_start_date_time,
      DATE_FORMAT(RD.end_date, '%Y-%m-%d 00:00:00') AS reservation_end_date,
      DATE_FORMAT(RD.end_date, '%Y-%m-%d') AS reservation_end_date_day,
      DATE_FORMAT(RD.end_date, '%H') AS reservation_end_date_time,
      RD.status,
      RD.create_time,
      RD.recent_update_time
    FROM
      reservation_detail AS RD
    LEFT JOIN
      space AS SP
    ON
      RD.space_id = SP.id
    LEFT JOIN
      reservation AS RV 
    ON
      RD.reservation_id = RV.id
    WHERE
      RD.status = 'complete'
    AND
      SP.is_active = 'Y'
    AND
      SP.location = ?
  `;
  let params: any = [ space ];
  params = params.filter(function(e: any){ return e === 0 || e });
  return { query, params };
}

/* 예약 상세 공간정보 조회 */
const getScheduleSpaceInfo = (id: string | number) => {
  const query = `
    SELECT
      RD.id,
      SP.*,
      DATE_FORMAT(RD.start_date, '%Y-%m-%d %H:%m:%s') AS start_date,
      DATE_FORMAT(RD.end_date, '%Y-%m-%d %H:%m:%s') AS end_date
    FROM
      reservation_detail AS RD
    LEFT JOIN
      space AS SP
    ON
      RD.space_id = SP.id 
    WHERE
      RD.id = ?
  `;
  let params: any = [ id ];
  params = params.filter(function(e: any){ return e === 0 || e });
  return { query, params };
}

module.exports = {
  getReservationDetailInfo,
  getScheduleSpaceInfo
}