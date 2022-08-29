import { Request, Response, NextFunction } from 'express';
import { cryptCompareSync } from '../../module/crypt';
import { createAccessToken, generateRefreshToken } from '../../middleware/jwt';
import * as connect from '../../middleware/db-connection';
const utilQuery = require('./util.query');

/* 로그인 정보 확인 */
const checkLoginInfo = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { userId, userPassword } = req.body;

    // Query
    const getUserLoginInfoQuery = utilQuery.getUserInfo(userId);
    const userInfo: any = await connect.executeForInput(getUserLoginInfoQuery.query, getUserLoginInfoQuery.params);

    // 로그인 검증
    if(userInfo.length <= 0){
      res.send({
        status: 401,
        message : "일치하는 회원정보가 없습니다."
      })
    }else{

      // 패스워드 일치여부
      const { password, salt } = userInfo[0];
      const { hashPassword } = await cryptCompareSync(userPassword, salt);

      // 패스워드가 일치할 때
      if(password === hashPassword){

        const accessToken = createAccessToken(userInfo[0].admin_id);
        const refreshToken = generateRefreshToken(userInfo[0].admin_id);
        const token = { accessToken, refreshToken };

        const updateUserTokenQuery = utilQuery.updateUserToken(accessToken, refreshToken, userId);
        const userTokenResult: any = await connect.executeForInput(updateUserTokenQuery.query, updateUserTokenQuery.params);

        if(userTokenResult.affectedRows > 0){

          res.cookie('userACT', accessToken);
          res.cookie('RFT', refreshToken);
          res.json({
            status: 200,
            message: "success",
            result: userInfo,
            token
          })
        }else{
          res.json({
            status: 500,
            message : "에러가 발생하였습니다.\n 관리자에게 문의해주세요."
          })
        }
      }else{
        res.send({
          status : 401,
          message : "일치하는 회원정보가 없습니다."
        })
      }
    }
  }catch(err){
    console.log(err);
    console.log('로그인 회원 정보 조회중 에러발생');
    next();
    return({
      err: err
    })
  }
}

/* 공간 목록 조회 */
const getSpaceList = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { space } = req.query;

    console.log(space);

    // Query
    const getSpaceListQuery = utilQuery.getSpaceList(space);
    const spaceList: any = await connect.executeForInput(getSpaceListQuery.query, getSpaceListQuery.params);

    res.json({
      status: 200,
      result: spaceList
    })

  }catch(err){
    console.log(err);
    console.log('공간 목록 조회중 에러발생');
    next();
  }
}

module.exports = {
  checkLoginInfo,
  getSpaceList
}