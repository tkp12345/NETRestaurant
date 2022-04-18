import React, { useState } from 'react';
import styled from 'styled-components';
import img from '../img/netImg.png'
import food from '../img/food.png'
import coffee from '../img/coffee.png'

const Login = () => {

    const [isSignup,setIsSignup] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [isAlert, setIsAlert] = useState(false);


    const onChange = (event) => {
        const { target: { name, value, checked }} = event;
        switch (name) {
          case 'username':
            return setUsername(value);
          case 'password':
            return setPassword(value);
          case 'name':
            return setName(value);
          case 'email':
            return setEmail(value);
          case 'signup':
            return setIsSignup(checked);
          default:
        }
      };

    //   const onSubmit = (event) => {
    //     event.preventDefault();
    //     if (signup) {
    //       onSignUp(username, password, name, email, url).catch(setError);
    //     } else {
    //       onLogin(username, password).catch(setError);
    //     }
    //   };

    return (
      <_Container>
      <_BoxContainer>
        <_Box/>
        <_Box/>
        <_Box/>
        <_Box/>
        <_Box/>
<_Login>
        <_Logo/>
        <form className='auth-form' >
        <div>
            <_Input
            name='username'
            type='text'
            placeholder='아이디'
            value={username}
            onChange={onChange}
            className='form-input'
            required
            />
        </div>
        <div>
            <_Input
                name='password'
                type='password'
                placeholder='비밀번호'
                value={password}
                className='form-input'
                onChange={onChange}
            />
        </div>
        {isSignup && (
        <div>
          <_Input
            name='name'
            type='text'
            placeholder='이름'
            value={name}
            onChange={onChange}
            className='form-input'
            required
          />
        </div>
        )}
        {isSignup && (
        <div>
          <_Input
            name='email'
            type='email'
            placeholder='이메일'
            value={email}
            onChange={onChange}
            className='form-input'
            required
          />
        </div>
        )}
        <div className='form-signup'>
        <label htmlFor='signup'> 아직 아이디가 없으신가요?</label>
          <_Input
            name='signup'
            id='signup'
            type='botton'
            onChange={onChange}
            // checked={signup}
          />
        </div>
        <_Button className='form-btn auth-form-btn' type='submit'>
          {isSignup ? '회원가입' : '로그인'}
        </_Button>
      </form>
    </_Login>
    </_BoxContainer>
    </_Container>

    );
};
const _Container = styled.div`
padding :60px;
display: flex;
flex-direction: column;
width: 100vw;
margin-top: 200px;
height: 100%;
justify-content: center;
align-items: center;
    `;

const _Login = styled.div`
padding : 40px;
display:flex;
flex-direction: column;
positon: relative;
width: 400px;
min-height: 400px;
background: rgba(255,255,255,0.1);
border-radius: 10px;
justify-content: center;
align-items: center;
box-shadow: 0 25px 45px rgb(0 0 0 / 10%);
backdrop-filter: blur(5px);
border: 1px solid rgba(255,255,255,0.5);
border-right: 1px solid rgba(255,255,255,0.2);
border-bottom: 1px solid rgba(255,255,255,0.2);
`;

const _Text = styled.h2`
position: relative;
color: #fff;
font-size:24px;
font-weight:600;
letter-spacing:1px;
margin-bottom:40px;
    `

const _Input = styled.input`
width: 100%;
background: rgba(255,255,255,0.2);
border: none;
outline: none;
padding: 10px 20px;
border-radius: 35px;
border: 1px solid rgba(255,255,255,0.5);
border-right: 1px solid rgba(255,255,255,0.2);
border-bottom: 1px solid rgba(255,255,255,0.2);
font-size: 16px;
letter-spacing:1px;
color:#fff;
box-shadow:0 5px 15px rgba(0,0,0,0.05);
margin: 8px 0;

::placeholder{
    color:#fff;
}
`;

const _Button = styled.button`
    background: #fff;
    color: #666;
`;

const _BoxContainer = styled.div`
margin-top:400px;
background: transparent;
border: 1px solid transparent;
position: absolute;
`;
const _Logo = styled.div`
background-position: center;
background-image: url(${img});
  background-size: 300px 100px;
  background-size: contain;
  background-repeat: no-repeat;
  width: 320px;
  height: 162px;
  margin-bottom: 20px;
}
`;
const _Box = styled.div`
position: absolute;
backdrop-filter:blur(5px);
box-shadow: 0 25px 45px rgba(0,0,0,0.1);
border: 1px solid rgba(255,255,255,0.5);
border-right: 1px solid rgba(255,255,255,0.2);
border-bottom: 1px solid rgba(255,255,255,0.2);
background: rgba(255,255,255,0.1);
border-radius:10px;
animation: animate 10s linear infinite;

@keyframes animate {
  {
    0%,100%{
      transform: translateY(-40px);
    }
    50%{
      transform: translateY(40px);
    }
  }

}


&:nth-child(1){
  top: -50px;
  right: -60px;
  width:100px;
  height:100px;
}

&:nth-child(2){
  top: 150px;
  left: -100px;
  width:120px;
  height:120px;
  z-index:2;
  background-image: url(${food});
  background-size: 300px 100px;
  background-size: contain;
  background-repeat: no-repeat;
}

&:nth-child(3){
  bottom: 50px;
  right: -60px;
  width:90px;
  height:90px;
  z-index:2;
    background-image: url(${coffee});
  background-size: 90px 90px;
  background-size: contain;
}

&:nth-child(4){
  bottom: -80px;
  right: 100px;
  width:60px;
  height:60px;
  z-index:2;
}
`;

export default Login;