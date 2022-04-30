import React ,{useCallback}from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import foodImg from '../img/food.png'
import coffeeImg from '../img/coffee.png'
import pharmacyImg from '../img/pharmacy.png'
import convenienceStoreImg from '../img/convenienceStore.png'
import bankImg from '../img/bank.png'
import accommodationImg from '../img/accommodation.png'


const _Container = styled.div`
width:100%;
font-color : #fff;
    `;

    const _Section = styled.div`
    padding: 100px 40px;
    `;

    const _Contents = styled.div`
    height: 100vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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
margin: 5px 50px;
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

const CTEGORY=[
    {id: 'FD6' , name: '음식점',content:'food',description:'', img:foodImg},
    {id: 'CE7' , name: '카페',  content:'coffee', description:'',img:coffeeImg},
    {id: 'PM9' , name: '약국',content:'pharmacy', description:'',img:pharmacyImg},
    {id: 'CS2' , name: '편의점',content:'convenience', description:'',img:convenienceStoreImg},
    {id: 'BK9' , name: '은행',content:'bank', description:'',img:bankImg},
    {id: 'AD5' , name: '숙박',content:'accommodation', description:'',img:accommodationImg},
]
const Main = () => {
    const navigate = useNavigate();

    return (
        <_Container>
            <_Section>
                <_Contents>
                    {CTEGORY.map(category=>{
                        return   <_Box img={category.img} onClick={()=>{ navigate(`/${category.content}`)}}/>
                    })
                    }
                </_Contents>
            </_Section>
    </_Container>
    );
};

export default Main;