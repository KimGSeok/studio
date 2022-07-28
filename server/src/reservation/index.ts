const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getReservationList); // 목록 조회
router.get('/:id', controller.getReservationDetailInfo); // 예약 상세정보 조회
router.post('/checkReservationPassword', controller.checkReservationPassword) // 비밀번호 확인
router.post('/', controller.doReservation) // 예약하기
router.put('/', controller.modifyReservation) // 예약 수정하기
router.delete('/', controller.deleteReservation) // 예약 삭제하기

module.exports = router;