/* 예약목록 조회하기 */
const getReservationList = () =>{
  const query = `
    SELECT
      id,
      title,
      name,
      view,
      create_time,
      recent_update_time
    FROM
      reservation
  `;
  let params: any = [ ];
  params = params.filter(function(e: any){ return e });
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

module.exports = {
  getReservationList,
  doReservation
}