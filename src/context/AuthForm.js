import {React,children,useMemo,useState,createRef,createContext,useImperativeHandle,useCallback} from 'react';
import Login from '../layout/Login';


//context api 사용법 : https://kyounghwan01.github.io/blog/React/react-context-api/#api
const AuthContext = createContext({});

//createRef 훅 사용법 : https://velog.io/@hoon_dev/React-Ref-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0feat-createRef
const contextRef = createRef();


/*****************************************************************
 *  AUTH 기능 ContextApi 컴포넌트
 * 
 *****************************************************************/
const AuthForm = () => {
const [isLogin,setIsLogin] = useState(false);

//service 주입
const onSignUp =useCallback(async (username,password,name,email)=>{
 
});

const onLogin =useCallback(async (username,password,name,email)=>{
 
});

const onLogout =useCallback(async (username,password,name,email)=>{
 
});


//contextApi 를 사용하기위한 상위 선언변수들을 넣어줍니다 
const contextForm = useMemo(()=>({
    isLogin,
    onSignUp,
    onLogin,
    onLogout,
}),[isLogin,
    onSignUp,
    onLogin,
    onLogout]);


  //자식에있는 요소를 부모에서 호출하기 위한 훅 :https://developer-alle.tistory.com/372
  useImperativeHandle(contextRef, () => (isLogin ? isLogin.token : false));



    return (
        <AuthContext.Provider value={contextForm}>
            {isLogin?(
                //하위 요소 호출 
                children
            ):(
                <div>
                    <Login onSignUp={onSignUp} onLogin={onLogin}/>
                </div>
            )}


        </AuthContext.Provider>
    );
};

export default AuthForm;