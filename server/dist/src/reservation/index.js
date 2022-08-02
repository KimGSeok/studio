"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const reservationController = require('./reservation.controller');
router.get('/', reservationController.getReservationList); // 목록 조회
router.get('/:id', reservationController.getReservationDetailInfo); // 예약 상세정보 조회
router.post('/checkReservationPassword', reservationController.checkReservationPassword); // 비밀번호 확인
router.post('/', reservationController.doReservation); // 예약하기
router.put('/changeReservationStatus', reservationController.changeReservationStatus); // 예약상태 변경
router.put('/', reservationController.modifyReservation); // 예약 수정하기
router.delete('/', reservationController.deleteReservation); // 예약 삭제하기
module.exports = router;
