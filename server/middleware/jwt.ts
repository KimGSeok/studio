const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

/* Access Token 생성*/
const createAccessToken = (userId: string) =>{
  if(userId != null){
    return jwt.sign(
      { userId },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    );
  }else{
    return false;
  }
}

/* Refresh Token 생성 */
const generateRefreshToken = (userId: string) =>{
  if(userId != null){
    return jwt.sign(
      { userId },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
  }else{
    return false;
  }
}

module.exports = {
  createAccessToken,
  generateRefreshToken
}