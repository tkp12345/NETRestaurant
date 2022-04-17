import React from 'react';
import styled from 'styled-components';
const _Container = styled.div`
height: 50px!important;
background : red;
`;

const Header = () => {
    return (
        <_Container>
            헤더
        </_Container>
    );
};

export default Header;