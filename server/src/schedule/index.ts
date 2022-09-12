import express from 'express';
const router = express.Router();
const scheduleController = require('./schedule.controller');

router.get('/', scheduleController.getReservationScheduleList); // 공간 예약현황 조회
router.get('/space', scheduleController.getScheduleSpaceInfo); // 예약날짜 상세 공간정보 조회
router.get('/:date', scheduleController.getScheduleDetailInfo); // 예약날짜 상세 예약정보 조회

module.exports = router;
