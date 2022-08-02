"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.createAccessToken = void 0;
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
/* Access Token 생성*/
const createAccessToken = (userId) => {
    if (userId != null) {
        return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
    }
    else {
        return false;
    }
};
exports.createAccessToken = createAccessToken;
/* Refresh Token 생성 */
const generateRefreshToken = (userId) => {
    if (userId != null) {
        return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
    }
    else {
        return false;
    }
};
exports.generateRefreshToken = generateRefreshToken;
