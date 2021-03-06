/********************************************************************************************
 *  토큰 저장 핸들러 
 * 
 *********************************************************************************************/


/********************************************************************************************
 *  ❗ 브라우저 localstorage 를 사용하는건 안전하지 않지만 편의를 위해 임시사용 
 * 
 *  💁‍♂️ 10주차 발표자료 연구 - 토큰이란 ? , 토큰을 어디다 저장해야할까 , localstorage 안전하지 않은이유
 *********************************************************************************************/

export default class TokenStorage{
    getToken(){
        return localStorage.getItem('token')
    }

    setToken(token){
        localStorage.setItem('token',token);
    }

    clearToken(){
        localStorage.clear('token');
    }

    getId(){
        return localStorage.getItem('token')
    }

    setId(id){
        localStorage.setItem('id',id);
    }

}