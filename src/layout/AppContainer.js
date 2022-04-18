import React from 'react';
import styled from 'styled-components';


const _Container = styled.div`
height:100vh;
// align-items: center;
// width:100%;
// justify-content: center;
// background : linear-gradient(to bottom,#6756be,#dff1ff);
// overflow: hidden;
`;


const SectionContainer = styled.div`
  position: absolute;
`

// const Section = styled.div`
// display: felx;
// & ${Section}:nth-child(1)  {
//     top: -350px;
//     width: 600px;
//     height: 600px;
//     background: #ff359b;
//   }
// & ${Section}:nth-child(2)  {
//     bottom: -150px;
//     left: 100px;
//     width: 500px;
//     height: 500px;
//     background: #fffd97;
//   }
// & ${Section}:nth-child(3)  {
//     background: #ff00ff;
//   }

// `;

const AppContainer = () => {
    return (
        <_Container>
            <SectionContainer>
                {/* <Section/>
                <Section/>
                <Section/> */}
            </SectionContainer>
        </_Container>
    );
};

export default AppContainer;