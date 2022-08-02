"use strict";
/* 회원정보 조회 */
const getUserInfo = (userId) => {
    const query = `
    SELECT
      id,
      admin_id,
      name,
      password,
      role,
      access_token,
      refresh_token,
      salt,
      create_time
    FROM
      admin
    WHERE
      admin_id = ?
  `;
    let params = [userId];
    params = params.filter(function (e) { return e === 0 || e; });
    return { query, params };
};
/* 유저 로그인 토큰정보 업데이트 */
const updateUserToken = (accessToken, refreshToken, userId) => {
    const query = `
    UPDATE
      admin
    SET
      access_token = ?,
      refresh_token = ?
    WHERE
      admin_id = ?
  `;
    let params = [accessToken, refreshToken, userId];
    params = params.filter(function (e) { return e === 0 || e; });
    return { query, params };
};
module.exports = {
    getUserInfo,
    updateUserToken
};
