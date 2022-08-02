"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypt_1 = require("../../module/crypt");
const jwt_1 = require("../../middleware/jwt");
const connect = __importStar(require("../../middleware/db-connection"));
const utilQuery = require('./util.query');
/* 로그인 정보 확인 */
const checkLoginInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parameter
        const { userId, userPassword } = req.body;
        // Query
        const getUserLoginInfoQuery = utilQuery.getUserInfo(userId);
        const userInfo = yield connect.executeForInput(getUserLoginInfoQuery.query, getUserLoginInfoQuery.params);
        // 로그인 검증
        if (userInfo.length <= 0) {
            res.send({
                status: 401,
                message: "일치하는 회원정보가 없습니다."
            });
        }
        else {
            // 패스워드 일치여부
            const { password, salt } = userInfo[0];
            const { hashPassword } = yield (0, crypt_1.cryptCompareSync)(userPassword, salt);
            // 패스워드가 일치할 때
            if (password === hashPassword) {
                const accessToken = (0, jwt_1.createAccessToken)(userInfo[0].admin_id);
                const refreshToken = (0, jwt_1.generateRefreshToken)(userInfo[0].admin_id);
                const token = { accessToken, refreshToken };
                const updateUserTokenQuery = utilQuery.updateUserToken(accessToken, refreshToken, userId);
                const userTokenResult = yield connect.executeForInput(updateUserTokenQuery.query, updateUserTokenQuery.params);
                if (userTokenResult.affectedRows > 0) {
                    res.cookie('userACT', accessToken);
                    res.cookie('RFT', refreshToken);
                    res.json({
                        status: 200,
                        message: "success",
                        result: userInfo,
                        token
                    });
                }
                else {
                    res.json({
                        status: 500,
                        message: "에러가 발생하였습니다.\n 관리자에게 문의해주세요."
                    });
                }
            }
            else {
                res.send({
                    status: 401,
                    message: "일치하는 회원정보가 없습니다."
                });
            }
        }
    }
    catch (err) {
        console.log(err);
        console.log('로그인 회원 정보 조회중 에러발생');
        next();
        return ({
            err: err
        });
    }
});
module.exports = {
    checkLoginInfo,
};
