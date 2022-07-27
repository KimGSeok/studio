const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getReservationList); // 목록 조회
router.get('/checkReservationPassword', controller.checkReservationPassword) // 비밀번호 확인
router.get('/:id', controller.getReservationDetailInfo); // 예약 상세정보 조회
router.post('/', controller.doReservation) // 예약하기

module.exports = router;