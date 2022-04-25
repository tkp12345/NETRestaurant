import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js'

const router = express.Router();

//로그인 유효성 처리 
const validateCredential= [
    body('username')
    .trim()
    .notEmpty()
    .withMessage('사용자 이름은 최소 5글자입니다'),
    body('password')
    .trim()
    .isLength({min : 5})
    .withMessage('사용자 비밀번호는 최소 5글자입니다'),
    validate,
];

//회원가입 유효성 처리 
const validateSignup = [
    //로그인 유효성 처리 
    ...validateCredential,
    body('name').notEmpty().withMessage('사용자 이름을 입력해주세요'),
    body('email').isEmail().normalizeEmail().withMessage('잘못된 이메일입니다'),
    validate,
];

// 요청에 따른 컨트롤러 연결 
router.post('/signup', validateSignup, authController.signup)
router.post('/login',  validateCredential, authController.login)

export default router;
