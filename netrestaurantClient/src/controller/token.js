export default class TokenStorage{
    //회원가입시
    setToken(token){
        localStorage.setItem('token',token);
    }

    //로그인시
    getToken(){
        localStorage.getItem('token');
    }

    //로그아웃시
    initToken(){
        localStorage.removeItem('token');
        //localStorage.clear();
    }
}