import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/auth.js';

const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req,res){
    //요청 바디에 있는정보 가져옴 
    console.log(req.body);
    const {username, password, name, email, url} = req.body;
    //현재 있는 유저 이름인지 
    const found = await userRepository.findByUsername(username);
    if(found){
        return res.status(409).json({message: `${username}은 이미 존재합니다`})
    }

    //사용자 입력 비밀번호 해싱 (암호화)
    const hashed = await bcrypt.hash(password, bcryptSaltRounds)
    
    //사용자의 정보를 가지고 토큰 생성
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    }) 
    const token = createJwtToken(userId);
    res.status(201).json({token,username});
}


export async function login(req, res){
    console.log(req.body);
    const {username,password} = req.body;
    const user = await userRepository.findByUsername(username);
    //기존 사용자 여부 확인
    if(!user){
        return res.status(401).json({message: '아이디 또는 비밀번호를 확인해 주세요'})
    }

    //사용자 입력 패스워드 확인
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        return res.status(401).json({message:'아이디 또는 비밀번호를 확인해 주세요'})
    }

    //로그인 성공 
    const token = createJwtToken(user.id);
    res.status(200).json({token,username});
}

function createJwtToken(id){
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpiresInDays});
}