import React, {children} from 'react';
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

const AppContainer = () => {
    return (
        <_Container>
            <SectionContainer>
               {children}
            </SectionContainer>
        </_Container>
    );
};

export default AppContainer;