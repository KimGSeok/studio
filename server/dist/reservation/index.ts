const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getReservationList); // 목록 조회
router.get('/:id', controller.getReservationDetailInfo); // 상세목록 조회
router.post('/', controller.doReservation) // 예약하기

module.exports = router;