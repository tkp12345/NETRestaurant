import React from 'react';
import styled from 'styled-components';
import img from '../img/netImg.png'
const _Container = styled.div`
height: 50px!important;
background : #fff;
z-index: 10;
box-shadow: 3px 13px 30px 0 rgba(131, 177, 180, 0.9);
margin-bottom:20px
`;

const _Logo = styled.div`
background-position: center;
background-image: url(${img});
  background-size: 20px 40px;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 90%;
  margin-bottom: 20px;
  `

const Header = () => {
    return (
        <_Container>
            <_Logo></_Logo>
        </_Container>
    );
};

export default Header;