import React ,{useCallback}from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import food from '../img/food.png'
import coffee from '../img/coffee.png'


const _Container = styled.div`
width:100%;
font-color : #fff;
    `;

    const _Section = styled.div`
    padding: 200px 40px;
    `;

    const _Contents = styled.div`
    height: 100vw;
    display: flex;
    justify-content: center;
}
    `;

// background-image: url(${food});
const _Box =styled.div`
backdrop-filter:blur(5px);
box-shadow: 0 25px 45px rgba(0,0,0,0.1);
border: 1px solid rgba(255,255,255,0.5);
border-right: 1px solid rgba(255,255,255,0.2);
border-bottom: 1px solid rgba(255,255,255,0.2);
background: rgba(102,0,153,0.3);
border-radius:10px;
z-index:10;
width:30vw;
height:30vw;
background-image:${(props) => props.img? `url(${props.img})`:'none' };  
background-size:${(props) => props.backgroundSize? props.backgroundSize:'300px 100px' };  
background-size: contain;
margin: 0px 50px;
background-repeat: no-repeat;
animation: animate 9s linear infinite;
&:hover {
     opacity:0.3;
}

@keyframes animate {
    {
      0%,100%{
        transform: translateY(-10px);
      }
      50%{
        transform: translateY(10px);
      }
    }
  
  }

`

const Main = () => {
    const navigate = useNavigate();

    const onClickNavFood = useCallback(()=>{
        navigate('/food');
    },[navigate]);

    const onClickNavCoffee = useCallback(()=>{
        navigate('/coffee');
    },[navigate]);

    return (
        <_Container>
            <_Section>
                <_Contents>
                    <_Box img={food} onClick={onClickNavFood}/>
                    <_Box img={coffee} onClick={onClickNavCoffee}/>
                </_Contents>
            </_Section>
    </_Container>
    );
};

export default Main;