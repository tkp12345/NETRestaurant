/*****************************************************************
 *  AUTH 설정 -  (로그인, 로그아웃, 회원가입 , AUTH)
 * 
 *****************************************************************/

//서버에서 전달받은 토큰을 읽고 쓰는 class 
export default class Auth{
    constructor (http , tokenStorage){
        this.http = http;
        this.tokenStorage =tokenStorage
    }

//로그인 
async login(username,password){
    //로그인 비동기 요청 
    const res = await this.http.fetch('/auth/login',{
        method:'POST',
        body:JSON.stringify({
            username,
            password,
        })
    });
    //성공 한다면 토큰스토리지 로그인 정보 저장 
    this.tokenStorage.setToken(res.token)
    return res;
}


//회원가입 
async signUp(username , password,name, email){
//회원가입 비동기 요청 
 const res = await this.http.fetch('/auth/signup',{
     method:'POST',
     body:JSON.stringify({
         username,
         password,
         name,
         email,
     })
 });
 //성공 한다면 토큰스토리지 회원가입정보 저장 
 this.tokenStorage.setToken(res.token);
 return res;
}

//api 요청시 현재 토큰정보  
async  baseURl(){
    //토큰을 스토리지로 부터 읽어옴 
    const baseToken = this.tokenStorage.getToken();
    //헤더에 토큰을 추가 하여 보내줌 
    return this.http.fetch('/auth/refresh',{
        method:'GET',
        Headers:{
            Authorization: `Bearer ${baseToken}`},
    });
}

async logout(){
     this.tokenStorage.clearToken();
    }
}

