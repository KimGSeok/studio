import express from 'express';
const router = express.Router();
const utilController = require('./util.controller');

router.post('/login', utilController.checkLoginInfo); // 로그인 정보 조회
router.get('/getSpaceList', utilController.getSpaceList); // 공간 목록 조회

module.exports = router;