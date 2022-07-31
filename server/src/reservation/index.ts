import express from 'express';
const router = express.Router();
const reservationController = require('./reservation.controller');

router.get('/', reservationController.getReservationList); // 목록 조회
router.get('/:id', reservationController.getReservationDetailInfo); // 예약 상세정보 조회
router.post('/checkReservationPassword', reservationController.checkReservationPassword) // 비밀번호 확인
router.post('/', reservationController.doReservation) // 예약하기
router.put('/', reservationController.modifyReservation) // 예약 수정하기
router.delete('/', reservationController.deleteReservation) // 예약 삭제하기

module.exports = router;